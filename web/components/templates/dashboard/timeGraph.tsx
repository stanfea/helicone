import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { getUSDate, getUSDateShort } from "../../shared/utils/utils";
import { clsx } from "../../shared/clsx";

export interface LineChartData {
  time: Date;
  value: number;
}

export const RenderLineChart = ({
  data,
  timeMap,
  valueFormatter,
  className,
}: {
  data: LineChartData[];
  timeMap: (date: Date) => string;
  valueFormatter?: (value: ValueType) => string | string[];
  className?: string;
}) => {
  const chartData = data.map((d) => ({
    ...d,
    time: timeMap(d.time),
  }));

  return (
    <div className={clsx("w-full h-full", className)}>
      <ResponsiveContainer className={"w-full h-full"}>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} opacity={50} strokeOpacity={0.5} />
          <Line
            type="monotone"
            dot={false}
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={1.5}
            animationDuration={0}
          />
          <XAxis
            dataKey="time"
            style={{
              fontSize: "0.85rem",
            }}
          />
          <YAxis
            style={{
              fontSize: "0.85rem",
            }}
          />
          <Tooltip
            formatter={(value) =>
              valueFormatter ? valueFormatter(value) : value
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
