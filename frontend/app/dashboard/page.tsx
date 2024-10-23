"use client";

import withPermission from "@/source/hook/withPermission";
import UserChart from "@/source/components/chartModal/userChart";
import RouteChart from "@/source/components/chartModal/routeChart";

const DashBoard: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <UserChart />
      </div>
      <div style={{ flex: 1 }}>
        <RouteChart />
      </div>
    </div>
  );
};

export default withPermission(DashBoard, "dashboard_view");
