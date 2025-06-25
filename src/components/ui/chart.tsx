"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  Area,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  type PieLabelRenderProps,
  Sector,
} from "recharts"

import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number
}

export function Chart({ height = 300, className, children, ...props }: ChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  formatter?: (value: number, name: string) => React.ReactNode
  labelFormatter?: (label: string) => React.ReactNode
  className?: string
}

export function ChartTooltip({ active, payload, label, formatter, labelFormatter, className }: ChartTooltipProps) {
  if (active && payload?.length) {
    return (
      <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {labelFormatter ? labelFormatter(label as string) : label}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {payload.map((item, index) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[0.70rem] uppercase text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-[0.70rem] font-bold">
                  {formatter ? formatter(item.value, item.name) : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

interface BarChartProps {
  data: Array<{ name: string; [key: string]: number | string }>
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
  showYAxis?: boolean
  showXAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
}

export function BarChart({
  data,
  categories,
  colors = ["#2563eb", "#e11d48", "#8b5cf6", "#f59e0b", "#10b981"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 40,
  showLegend = true,
  showYAxis = true,
  showXAxis = true,
  showGrid = true,
  showTooltip = true,
  className,
}: BarChartProps) {
  return (
    <Chart className={className}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={8} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => valueFormatter(value as number)}
            tickMargin={8}
          />
        )}
        {showTooltip && (
          <RechartsTooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload?.map((item, index) => ({
                  name: item.dataKey as string,
                  value: item.value as number,
                  color: colors[index % colors.length],
                }))}
                label={label}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && (
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
          />
        )}
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        ))}
      </RechartsBarChart>
    </Chart>
  )
}

interface LineChartProps {
  data: Array<{ name: string; [key: string]: number | string }>
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
  showYAxis?: boolean
  showXAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
}

export function LineChart({
  data,
  categories,
  colors = ["#2563eb", "#e11d48", "#8b5cf6", "#f59e0b", "#10b981"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 40,
  showLegend = true,
  showYAxis = true,
  showXAxis = true,
  showGrid = true,
  showTooltip = true,
  className,
}: LineChartProps) {
  return (
    <Chart className={className}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={8} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => valueFormatter(value as number)}
            tickMargin={8}
          />
        )}
        {showTooltip && (
          <RechartsTooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload?.map((item, index) => ({
                  name: item.dataKey as string,
                  value: item.value as number,
                  color: colors[index % colors.length],
                }))}
                label={label}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && (
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
          />
        )}
        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        ))}
      </RechartsLineChart>
    </Chart>
  )
}

interface AreaChartProps {
  data: Array<{ name: string; [key: string]: number | string }>
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
  showYAxis?: boolean
  showXAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
}

export function AreaChart({
  data,
  categories,
  colors = ["#2563eb", "#e11d48", "#8b5cf6", "#f59e0b", "#10b981"],
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 40,
  showLegend = true,
  showYAxis = true,
  showXAxis = true,
  showGrid = true,
  showTooltip = true,
  className,
}: AreaChartProps) {
  return (
    <Chart className={className}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={8} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => valueFormatter(value as number)}
            tickMargin={8}
          />
        )}
        {showTooltip && (
          <RechartsTooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload?.map((item, index) => ({
                  name: item.dataKey as string,
                  value: item.value as number,
                  color: colors[index % colors.length],
                }))}
                label={label}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && (
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
          />
        )}
        {categories.map((category, index) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            fillOpacity={0.1}
            strokeWidth={2}
          />
        ))}
      </RechartsAreaChart>
    </Chart>
  )
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent ? percent * 100 : 0).toFixed(0)}%`}
    </text>
  )
}

interface PieChartProps {
  data: Array<{ name: string; value: number }>
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLabel?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function PieChart({
  data,
  colors = ["#2563eb", "#e11d48", "#8b5cf6", "#f59e0b", "#10b981"],
  valueFormatter = (value: number) => value.toString(),
  showLabel = true,
  showLegend = true,
  showTooltip = true,
  className,
}: PieChartProps) {
  const [activeIndex, setActiveIndex] = React.useState(-1)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(-1)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  return (
    <Chart className={className}>
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        {showTooltip && (
          <RechartsTooltip
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                payload={payload?.map((item, index) => ({
                  name: item.name as string,
                  value: item.value as number,
                  color: colors[index % colors.length],
                }))}
                formatter={(value) => valueFormatter(value)}
              />
            )}
          />
        )}
        {showLegend && (
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
          />
        )}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showLabel ? renderCustomizedLabel : undefined}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </Chart>
  )
}
