import { searchGallery } from '@/application/gallery/search-gallery';
import { parseGallerySearchParams } from '@/lib/api/gallery-search-request';

export const GET = async (request: Request): Promise<Response> => {
  const params = parseGallerySearchParams(new URL(request.url).searchParams);

  if (!params) {
    return Response.json({ error: 'Invalid gallery parameters.' }, { status: 400 });
  }

  const result = await searchGallery(params.locale, params.query);
  return Response.json(result);
};
