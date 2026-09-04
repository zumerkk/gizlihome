"use client";

import { useMemo, useState } from "react";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "@/components/products/product-info";
import type { Product } from "@/types/product";

export function ProductDetailExperience({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const images = useMemo(
    () => product.colorImages?.[selectedColor] ?? product.images,
    [product.colorImages, product.images, selectedColor],
  );

  return (
    <div className="site-container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
      <ProductGallery
        images={images}
        videos={product.videos}
        productId={product.id}
        productName={`${product.name} · ${selectedColor}`}
      />
      <ProductInfo
        product={product}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </div>
  );
}
