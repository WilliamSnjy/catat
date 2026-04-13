"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from "recharts";

export default function CardChart({
  totalPengeluaran,
  targetBulanan
}) {

const total = totalPengeluaran[0].total
// const total = 3000000

const persen = Math.min(
    (total / targetBulanan) * 100,
    100
);

const data = [
    {
      name: "Pengeluaran",
      value: persen
    }
];

  return (
    <div className="w-full min-w-0 flex flex-col text-center rounded-sm shadow p-2 bg-lime-100 ">
        <h2 className="font-bold">
            Persentase Target Bulanan
        </h2>
        <div className="flex flex-col items-center">
            <RadialBarChart
                width={200}
                height={200}
                innerRadius="70%"
                outerRadius="100%"
                data={data}
                startAngle={90}
                endAngle={-270}
            >
                <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                tick={false}
                />

                <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="#2B7A26"
                background
                />
            </RadialBarChart>
        </div>
        <p className="text-3xl font-bold">
            {persen.toFixed(0)}%
        </p>
    </div>
  );
}