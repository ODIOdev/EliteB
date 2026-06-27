import { notFound } from "next/navigation";
import { getListingById, MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";
import { SiteShell } from "@/components/site/site-shell";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: l.id }));
}

export default function ListingDetailPage({ params }: Props) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  return (
    <SiteShell>
      <ListingDetailContent listing={listing} />
    </SiteShell>
  );
}
