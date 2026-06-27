import {
  BUREAU_SCORES,
  CREDIT_ACTIVITY,
  CREDIT_INTEGRATIONS,
  NEGATIVE_ITEMS,
  averageScore,
} from "@/lib/credit-demo-data";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const openDisputes = NEGATIVE_ITEMS.filter(
    (item) => item.disputeStatus === "sent" || item.disputeStatus === "in_review"
  ).length;
  const removedItems = NEGATIVE_ITEMS.filter((item) => item.disputeStatus === "removed").length;

  return Response.json({
    pulledAt: new Date().toISOString(),
    averageScore: averageScore(BUREAU_SCORES),
    bureaus: BUREAU_SCORES,
    negativeItems: NEGATIVE_ITEMS,
    integrations: CREDIT_INTEGRATIONS,
    activity: CREDIT_ACTIVITY,
    stats: {
      openDisputes,
      removedItems,
      totalNegative: NEGATIVE_ITEMS.filter((item) => item.disputeStatus !== "removed").length,
      scoreChange: 15,
    },
  });
}
