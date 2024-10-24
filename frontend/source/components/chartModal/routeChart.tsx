"use client";

import UserApi from "@/source/apis/users";
import withPermission from "@/source/hook/withPermission";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import RouteApi from "@/source/apis/routes";
import { statusMap } from "@/source/mocks/mocks";

type EChartsOption = echarts.EChartsOption;

type RouteStatus = {
  status: number;
  count: number;
};

const RouteChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null); // Ref for the chart instance
  const [routesByStatus, setRoutesByStatus] = useState<RouteStatus[]>([]);

  const getRouteStatistics = async () => {
    try {
      const response = await RouteApi.getRouteStatistics();
      console.log("response", response);
      const transformedData: RouteStatus[] = Object.entries(response).map(
        ([status, count]) => ({
          status: Number(status), 
          count: Number(count), 
        })
      );
      setRoutesByStatus(transformedData);
    } catch (error) {
      message.error("Failed to fetch getRouteStatistics");
      console.error("Failed to fetch getRouteStatistics: ", error);
    }
  };

  useEffect(() => {
    getRouteStatistics();
    if (chartRef.current) {
      myChart.current = echarts.init(chartRef.current);
    }
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
          text: "Routes chart", // Set your chart title here
          left: "center",
          top: "87%", // Adjust this value based on your layout
          textStyle: {
            fontSize: 18, // You can customize the font size and style
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
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
              borderWidth: 2,
            },
            data: routesByStatus.map(({ status, count }) => {
              const statusInfo = statusMap[status]; // Get text and color from statusMap
              return {
                name: statusInfo ? statusInfo.text : `Status ${status}`, // Use mapped status text
                value: count,
                itemStyle: {
                  color: statusInfo ? statusInfo.color : "#000", // Use mapped status color
                },
              };
            }),
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
  }, [routesByStatus]);

  return (
    <div>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default RouteChart;
