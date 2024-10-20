"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


export function MyPieChart({doghnutData}) {

  const chartData = doghnutData.reduce((acc, curr) => {
    const categoryIndex = acc.findIndex(item => item.category === curr.category);
    if (categoryIndex > -1) {
      acc[categoryIndex].amount += curr.amount;
    } else {
      acc.push({ category: curr.category, amount: curr.amount });
    }
    return acc;
  }, []);
  

  const chartConfig = {
    amount: {
      label: "Amount",
    },
  };
  console.log(chartData);
  
  return (

    <>
    {chartData?
    
    <Card className="flex flex-col border-none shadow-none">

    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  const totalAmount = chartData.reduce((acc:number, curr:{amount:number}) => acc + curr.amount, 0);
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalAmount.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Amount
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>

  </Card>
    
    :<></>}

    </>
  );
}
