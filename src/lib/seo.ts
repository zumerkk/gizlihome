import { brand, seoKeywords } from "@/data/site";
import { faqs } from "@/data/faq";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export function sanitizeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${brand.siteUrl}/#organization`,
        name: brand.name,
        url: brand.siteUrl,
        logo: `${brand.siteUrl}/images/brand/gizli-home-logo-light.png`,
        sameAs: [brand.instagramUrl],
        slogan: brand.slogan,
        keywords: seoKeywords.join(", "),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: brand.whatsappDisplay,
            contactType: "sales",
            availableLanguage: ["tr"],
            areaServed: "TR",
          },
        ],
      },
      {
        "@type": ["LocalBusiness", "FurnitureStore"],
        "@id": `${brand.siteUrl}/#localbusiness`,
        name: brand.name,
        image: `${brand.siteUrl}/images/generated/og-premium.webp`,
        url: brand.siteUrl,
        telephone: brand.whatsappDisplay,
        priceRange: "Teklif Al",
        address: {
          "@type": "PostalAddress",
          streetAddress: brand.address,
          addressLocality: brand.addressLocality,
          addressRegion: brand.addressRegion,
          addressCountry: "TR",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "10:00",
            closes: "19:00",
          },
        ],
        sameAs: [brand.instagramUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${brand.siteUrl}/#website`,
        url: brand.siteUrl,
        name: brand.name,
        publisher: {
          "@id": `${brand.siteUrl}/#organization`,
        },
        inLanguage: "tr-TR",
        description:
          "Gizli dolap, gizli mobilya, şifreli dolap ve NFC kartlı gizli bölmeli mobilya çözümleri.",
        keywords: seoKeywords.join(", "),
        potentialAction: {
          "@type": "SearchAction",
          target: `${brand.siteUrl}/urunler?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function productSchema(product: Product) {
  const offer = product.isCustomQuote
    ? {
        "@type": "Offer",
        priceCurrency: "TRY",
        availability: "https://schema.org/PreOrder",
        url: `${brand.siteUrl}/urunler/${product.slug}`,
        seller: {
          "@id": `${brand.siteUrl}/#organization`,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "TRY",
          description:
            "Ürün fiyatı renk, ölçü, mekanizma ve teslimat planına göre WhatsApp üzerinden tekliflendirilir.",
        },
      }
    : {
        "@type": "Offer",
        priceCurrency: "TRY",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `${brand.siteUrl}/urunler/${product.slug}`,
        seller: {
          "@id": `${brand.siteUrl}/#organization`,
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "TRY",
          price: product.price,
          description: formatPrice(product.price),
        },
      };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${brand.siteUrl}/urunler/${product.slug}#product`,
    name: product.name,
    image: product.images.map((image) => `${brand.siteUrl}${image}`),
    description: product.seoDescription,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    category: product.category,
    sku: product.id,
    material: "Premium MDF lam, mobilya mekanizması ve seçilen yüzey kaplaması",
    color: product.colors,
    keywords: [
      product.name,
      product.category,
      product.collection,
      ...product.features,
      ...seoKeywords,
    ].join(", "),
    additionalProperty: [
      ...product.features.map((feature) => ({
        "@type": "PropertyValue",
        name: "Özellik",
        value: feature,
      })),
      ...product.technicalSpecs.map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value,
      })),
    ],
    offers: offer,
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${brand.siteUrl}${item.href}`,
    })),
  };
}
