"use client";

import UserApi from "@/source/apis/users";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

const UserChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null); // Ref for the chart instance
  const [usersByRole, setUsersByRole] = useState<
    { role?: string; total?: number }[]
  >([]);

  const getTotalActiveUsers = async () => {
    try {
      const response = await UserApi.getTotalUsersByRole();
      setUsersByRole(response.data);
    } catch (error) {
      message.error("Failed to fetch getTotalUsersByRole");
      console.error("Failed to fetch getTotalUsersByRole: ", error);
    }
  };

  useEffect(() => {
    getTotalActiveUsers();
    if (chartRef.current) {
      myChart.current = echarts.init(chartRef.current);
    }
    // Cleanup function to dispose of the chart when the component unmounts
    return () => {
      if (myChart.current) {
        myChart.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (myChart.current) {
      const option: EChartsOption = {
        title: {
          text: "Users chart",
          left: "center",
          top: "87%", 
          textStyle: {
            fontSize: 18, 
          },
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
            },
            data: usersByRole.map(({ role, total }) => ({
              name: role,
              value: total,
            })),
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };

      // Update the chart with the new options
      myChart.current.setOption(option);
    }
  }, [usersByRole]);

  return (
    <div>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default UserChart;
