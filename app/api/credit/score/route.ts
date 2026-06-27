import { BUREAU_SCORES, averageScore } from "@/lib/credit-demo-data";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const bureaus = BUREAU_SCORES.map((bureau) => ({
    ...bureau,
    change: bureau.change + Math.floor(Math.random() * 3),
  }));

  return Response.json({
    pulledAt: new Date().toISOString(),
    model: "FICO Score 8",
    average: averageScore(bureaus),
    bureaus,
    source: "Array Credit Reporting · Experian Connect · Equifax OneView · TransUnion TUX",
  });
}
