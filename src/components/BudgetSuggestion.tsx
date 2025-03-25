
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

interface BudgetSuggestion {
  amount: number;
  change: number;
  confidence: number;
  shapValues: {
    feature: string;
    impact: number;
    description: string;
  }[];
}

interface BudgetSuggestionProps {
  selectedCanton?: string;
  selectedAccount?: { id: number; account_number: number; name: string; category: string; } | null;
  onSuggestionChange?: (amount: number) => void;
}

const BudgetSuggestion = ({ selectedCanton, selectedAccount, onSuggestionChange }: BudgetSuggestionProps) => {
  const [suggestion, setSuggestion] = useState<BudgetSuggestion>({
    amount: 0,
    change: 0,
    confidence: 0,
    shapValues: []
  });

  useEffect(() => {
    const baseAmount = 2750000;
    const randomVariation = Math.floor(Math.random() * 500000) - 250000;
    const randomChange = +(Math.random() * 16 - 8).toFixed(1);
    // Generate mock SHAP values
    const mockShapValues = [
      {
        feature: "Historical trends",
        impact: 0.42,
        description: "Past 5 years of budget execution"
      },
      {
        feature: "Economic indicators",
        impact: 0.28,
        description: "GDP growth, inflation, employment"
      },
      {
        feature: "Policy changes",
        impact: 0.18,
        description: "Recent legislation affecting this account"
      },
      {
        feature: "Demographic factors",
        impact: 0.12,
        description: "Population changes in target demographics"
      }
    ];
    
    const newAmount = baseAmount + randomVariation;
    
    setSuggestion({
      amount: newAmount,
      change: randomChange,
      confidence: Math.floor(Math.random() * 15 + 85),
      shapValues: mockShapValues
    });
    
    // Pass the suggestion amount up to the parent component
    if (onSuggestionChange) {
      onSuggestionChange(newAmount);
    }
  }, [selectedCanton, selectedAccount, onSuggestionChange]);

  return (
    <Card className="p-6 space-y-4 animate-fade-in bg-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Budget Suggestion Analysis</h3>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-1">SHAP Values</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[250px] text-xs">
                  SHAP (SHapley Additive exPlanations) values show how each feature contributes to the prediction.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* SHAP Values Display */}
      <div className="space-y-2 pt-2">
        <div className="text-xs text-muted-foreground font-medium">Prediction factors:</div>
        {suggestion.shapValues.map((shap, index) => (
          <div key={index} className="flex items-center text-xs">
            <div className="w-32 truncate" title={shap.feature}>{shap.feature}</div>
            <div className="flex-1 mx-2">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${shap.impact * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-10 text-right">{(shap.impact * 100).toFixed(0)}%</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BudgetSuggestion;
