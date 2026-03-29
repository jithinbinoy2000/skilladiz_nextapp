"use client";

import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BookingsWeekChart({ chartData, loading }) {
  const categories = chartData?.map((d) => {
    const date = new Date(d.date + "T00:00:00");
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }) ?? [];

  const series = [
    {
      name: "Bookings",
      data: chartData?.map((d) => d.count) ?? [],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: "55%" },
    },
    dataLabels: { enabled: false },
    colors: ["#465FFF"],
    xaxis: {
      categories,
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
        formatter: (v) => Math.floor(v),
      },
      tickAmount: 4,
      min: 0,
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (v) => `${v} booking${v !== 1 ? "s" : ""}` },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        opacityFrom: 1,
        opacityTo: 0.8,
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Bookings — Last 7 Days
        </h3>
      </div>

      {loading ? (
        <div className="flex h-[220px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
        </div>
      ) : (
        <ApexChart
          options={options}
          series={series}
          type="bar"
          height={220}
          width="100%"
        />
      )}
    </div>
  );
}
