"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type MotionSystemProps = {
  children: ReactNode;
};

function registerRevealTargets(observer: IntersectionObserver, root: ParentNode) {
  if (root instanceof HTMLElement && root.matches("[data-reveal]")) {
    observer.observe(root);
  }
  const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");

  targets.forEach((target) => {
    observer.observe(target);
  });
}

export function MotionSystem({ children }: MotionSystemProps) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -88, duration: 1.15 },
      duration: 1.08,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealState = "visible";
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const register = (root: ParentNode) => {
      registerRevealTargets(revealObserver, root);
      if (reducedMotion) {
        if (root instanceof HTMLElement && root.matches("[data-reveal]")) {
          root.dataset.revealState = "visible";
        }
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
          target.dataset.revealState = "visible";
        });
      }
    };

    const timers = new Set<number>();
    const scheduleRegister = (root: ParentNode, delay = 420) => {
      const timer = window.setTimeout(() => {
        register(root);
        timers.delete(timer);
      }, delay);
      timers.add(timer);
    };

    const initialTimer = window.setTimeout(() => {
      register(document);
      document.documentElement.classList.add("motion-ready");
    }, 420);
    timers.add(initialTimer);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            scheduleRegister(node);
          }
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      mutations.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let activeTilt: HTMLElement | null = null;
    let activeMagnetic: HTMLElement | null = null;
    let pointerFrame = 0;
    let pointerX = -100;
    let pointerY = -100;

    const movePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--pointer-x", `${pointerX}px`);
          document.documentElement.style.setProperty("--pointer-y", `${pointerY}px`);
          pointerFrame = 0;
        });
      }

      const target = event.target instanceof Element ? event.target : null;
      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (activeTilt && activeTilt !== tilt) {
        activeTilt.style.setProperty("--tilt-x", "0deg");
        activeTilt.style.setProperty("--tilt-y", "0deg");
      }
      activeTilt = tilt;

      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        tilt.style.setProperty("--tilt-x", `${(0.5 - y) * 2.2}deg`);
        tilt.style.setProperty("--tilt-y", `${(x - 0.5) * 2.8}deg`);
        tilt.style.setProperty("--glow-x", `${x * 100}%`);
        tilt.style.setProperty("--glow-y", `${y * 100}%`);
      }

      const magnetic = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (activeMagnetic && activeMagnetic !== magnetic) {
        activeMagnetic.style.setProperty("--magnetic-x", "0px");
        activeMagnetic.style.setProperty("--magnetic-y", "0px");
      }
      activeMagnetic = magnetic;

      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        magnetic.style.setProperty("--magnetic-x", `${x * 0.1}px`);
        magnetic.style.setProperty("--magnetic-y", `${y * 0.12}px`);
      }
    };

    const resetPointerTarget = (event: PointerEvent) => {
      if (event.relatedTarget instanceof Node && document.documentElement.contains(event.relatedTarget)) {
        return;
      }
      activeTilt?.style.setProperty("--tilt-x", "0deg");
      activeTilt?.style.setProperty("--tilt-y", "0deg");
      activeMagnetic?.style.setProperty("--magnetic-x", "0px");
      activeMagnetic?.style.setProperty("--magnetic-y", "0px");
      activeTilt = null;
      activeMagnetic = null;
    };

    window.addEventListener("pointermove", movePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointerTarget);

    return () => {
      window.removeEventListener("pointermove", movePointer);
      document.documentElement.removeEventListener("pointerleave", resetPointerTarget);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <>
      <ViewTransition key={pathname} enter="route-enter" exit="route-exit" default="none">
        <div className="route-surface">{children}</div>
      </ViewTransition>
      <div className="ambient-pointer" aria-hidden="true" />
    </>
  );
}
