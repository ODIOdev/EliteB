import { Suspense } from "react";
import { ListingsContent } from "@/components/listings/listings-content";
import { SiteShell } from "@/components/site/site-shell";

export default function ListingsPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading listings...</div>}>
        <ListingsContent />
      </Suspense>
    </SiteShell>
  );
}
