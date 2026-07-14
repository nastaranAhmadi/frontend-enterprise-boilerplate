import type { Product } from '@/repositories/product/product.types';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => (
  <article className="rounded-lg border border-border bg-background p-lg">
    <p className="text-xs font-medium uppercase tracking-wide text-primary">{product.category}</p>
    <h2 className="mt-xs text-lg font-medium text-foreground">{product.name}</h2>
    <p className="mt-sm text-sm text-muted-foreground">{product.description}</p>
  </article>
);
