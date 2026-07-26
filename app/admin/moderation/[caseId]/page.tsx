import { ModerationCaseDetail } from "@/components/admin/ModerationCaseDetail";
import { getModerationCase } from "@/lib/moderation-placeholder";

type ModerationCasePageProps = {
  params: Promise<{ caseId: string }>;
};

export default async function ModerationCasePage({ params }: ModerationCasePageProps) {
  const { caseId } = await params;
  return <ModerationCaseDetail moderationCase={getModerationCase(caseId)} />;
}
