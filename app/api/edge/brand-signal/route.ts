export function GET() {
  return Response.json(
    {
      brand: 'AutoComp Corp',
      mode: 'autonomous-regtech',
      state: 'monitoring',
      controls: ['observe', 'draft', 'approve', 'professional-review']
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=30',
        'CDN-Cache-Control': 'public, max-age=300',
        'Vercel-CDN-Cache-Control': 'public, max-age=1800, stale-while-revalidate=21600'
      }
    }
  );
}
