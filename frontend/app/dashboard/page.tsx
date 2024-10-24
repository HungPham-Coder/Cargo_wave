"use client";

import withPermission from "@/source/hook/withPermission";
import UserChart from "@/source/components/chartModal/userChart";
import RouteChart from "@/source/components/chartModal/routeChart";
import StatisticPage from "@/source/components/chartModal/statisticChart";

const DashBoard: React.FC = () => {
  return (
    <div>
      <StatisticPage></StatisticPage>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ flex: 1 }}>
          <UserChart />
        </div>
        <div style={{ flex: 1 }}>
          <RouteChart />
        </div>
      </div>
    </div>
  );
};

export default withPermission(DashBoard, "dashboard_view");
