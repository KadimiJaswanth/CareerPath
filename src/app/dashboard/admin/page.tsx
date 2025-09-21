'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const chartData = [
  { month: 'January', users: 186, interviews: 80 },
  { month: 'February', users: 305, interviews: 200 },
  { month: 'March', users: 237, interviews: 120 },
  { month: 'April', users: 273, interviews: 190 },
  { month: 'May', users: 209, interviews: 130 },
  { month: 'June', users: 214, interviews: 140 },
];

const chartConfig = {
  users: {
    label: 'New Users',
    color: 'hsl(var(--chart-1))',
  },
  interviews: {
    label: 'Mock Interviews',
    color: 'hsl(var(--chart-2))',
  },
};

const pieChartData = [
  { name: 'Software Dev', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Data Science', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'UX Design', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Product Mgmt', value: 200, fill: 'hsl(var(--chart-4))' },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User Engagement</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="users" fill="var(--color-users)" radius={4} />
              <Bar
                dataKey="interviews"
                fill="var(--color-interviews)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Popular Career Tracks</CardTitle>
          <CardDescription>
            Distribution of user interest in career paths.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer config={{}} className="h-64 w-full">
             <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={pieChartData} dataKey="value" nameKey="name" />
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
