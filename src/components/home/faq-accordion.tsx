import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faq";

export function FAQAccordion({ limit }: { limit?: number }) {
  const visibleFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="bg-cream py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
            Sık Sorulan Sorular
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-none text-obsidian md:text-6xl">
            Net, Kısa, Güven Veren.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Ödeme, teslimat, erişim sistemi ve özel üretim hakkında en sık
            gelen soruları derledik.
          </p>
          {limit ? (
            <Button asChild variant="dark" className="mt-7">
              <Link href="/sss">Tüm S.S.S. Alanını Gör</Link>
            </Button>
          ) : null}
        </div>
        <Accordion type="single" collapsible className="rounded-md bg-white px-5">
          {visibleFaqs.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
