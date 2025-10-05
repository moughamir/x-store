import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  isNegative?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  isNegative = false,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
        {change && (
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            {isNegative ? (
              <ArrowDownIcon className="w-4 h-4 text-destructive" />
            ) : (
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
            )}
            <span
              className={`ml-1 font-medium ${
                isNegative ? "text-destructive" : "text-green-500"
              }`}>
              {change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

