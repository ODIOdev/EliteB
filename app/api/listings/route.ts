import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listingType = searchParams.get("type");
  const featured = searchParams.get("featured");

  const { MOCK_LISTINGS } = await import("@/lib/mock-data");
  let listings = MOCK_LISTINGS;

  if (listingType) listings = listings.filter((l) => l.listing_type === listingType);
  if (featured === "true") listings = listings.filter((l) => l.featured);

  return NextResponse.json({ listings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const listing = {
      title: body.title,
      address: body.address,
      city: body.city,
      state: body.state || "NY",
      price: body.price,
      listing_type: body.listing_type || body.type,
      status: body.status || "active",
      beds: body.beds,
      baths: body.baths,
      sqft: body.sqft,
      description: body.description,
      featured: body.featured ?? false,
    };

    // TODO: Insert into Supabase
    // const supabase = createServerSupabaseClient();
    // const { data, error } = await supabase.from("listings").insert(listing).select().single();

    return NextResponse.json({ success: true, listing }, { status: 201 });
  } catch (error) {
    console.error("Listing creation error:", error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}
