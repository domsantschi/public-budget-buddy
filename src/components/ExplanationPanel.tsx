
import { Card } from "./ui/card";
import { Info } from "lucide-react";

const ExplanationPanel = () => {
  return (
    <Card className="p-6 space-y-4 animate-fade-in bg-white/50 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <Info className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Budget Analysis</h3>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          Based on historical spending patterns and current economic indicators, we suggest a moderate increase in the budget allocation. Key factors influencing this recommendation include:
        </p>
        
        <ul className="list-disc pl-4 space-y-2">
          <li>5.2% increase in departmental operating costs</li>
          <li>Projected inflation rate of 3.1% for the next fiscal year</li>
          <li>Historical budget utilization rate of 97%</li>
          <li>Planned infrastructure upgrades in Q3</li>
        </ul>

        <p className="mt-4 pt-4 border-t">
          This suggestion aims to maintain service quality while accounting for cost increases and planned improvements.
        </p>
      </div>
    </Card>
  );
};

export default ExplanationPanel;
