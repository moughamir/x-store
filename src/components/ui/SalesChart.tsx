'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

export default function SalesChart() {
  // This is a placeholder for a real chart component
  // In a real application, you would use a library like Chart.js, Recharts, or D3.js

  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [1200, 1900, 1500, 2000, 2400, 1800, 2800, 3200, 2900, 3500, 3800, 4200];

  // Calculate the max value for scaling
  const maxValue = Math.max(...data);
  const totalSales = data.reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <div className="flex items-end h-52 space-x-2">
            {data.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-primary/20 rounded-t"
                  style={{
                    height: `${(value / maxValue) * 100}%`,
                  }}
                >
                  <div
                    className="w-full bg-primary rounded-t"
                    style={{
                      height: `100%`,
                    }}
                  />
                </div>
                <span className="text-xs mt-1 text-muted-foreground">{months[index]}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Total Sales:</span> ${totalSales.toLocaleString()}
            </div>
            <div className="text-sm text-green-500 flex items-center">
              <span className="font-medium">+24%</span>
              <ArrowUpIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
