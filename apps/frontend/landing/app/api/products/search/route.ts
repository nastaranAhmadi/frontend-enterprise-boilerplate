import { searchProducts } from '@/application/product/search-products';
import { parseProductSearchParams } from '@/lib/api/product-search-request';

export const GET = async (request: Request): Promise<Response> => {
  const params = parseProductSearchParams(new URL(request.url).searchParams);

  if (!params) {
    return Response.json({ error: 'Invalid search parameters.' }, { status: 400 });
  }

  const products = await searchProducts(params.locale, params.query);
  return Response.json(products);
};
