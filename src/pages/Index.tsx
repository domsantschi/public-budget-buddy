
import SearchBar from "@/components/SearchBar";
import BudgetSuggestion from "@/components/BudgetSuggestion";
import ExplanationPanel from "@/components/ExplanationPanel";
import ChatInterface from "@/components/ChatInterface";
import ExportPreview from "@/components/ExportPreview";
import { useState } from "react";

const Index = () => {
  const [selectedCanton, setSelectedCanton] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<{
    id: number;
    account_number: number;
    name: string;
    category: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Public Budget Planning</h1>
          <p className="text-lg text-muted-foreground">
            Make informed decisions with AI-powered budget suggestions
          </p>
          <SearchBar 
            onCantonChange={setSelectedCanton}
            onAccountChange={setSelectedAccount}
            initialCanton={selectedCanton}
            initialAccount={selectedAccount}
          />
        </div>

        {/* Main Content - Three Column Layout with consistent spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Budget Input/Comparison */}
          <div className="w-full">
            <ExportPreview 
              selectedCanton={selectedCanton}
              selectedAccount={selectedAccount}
            />
          </div>

          {/* Middle Column - Static Explanation */}
          <div className="space-y-6 w-full">
            <BudgetSuggestion 
              selectedCanton={selectedCanton}
              selectedAccount={selectedAccount}
            />
            <ExplanationPanel />
          </div>

          {/* Right Column - Chat Interface */}
          <div className="w-full">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
