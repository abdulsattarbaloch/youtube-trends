import EngagementDashboard from "@/components/metrics/engagement-rate";
import ViewVelocityDashboard from "@/components/metrics/view-velocity";

export default function Page() {
  return (
    <div className="space-y-10">
      <EngagementDashboard />
      <ViewVelocityDashboard />
    </div>
  );
}
