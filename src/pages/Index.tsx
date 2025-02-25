
import SearchBar from "@/components/SearchBar";
import BudgetSuggestion from "@/components/BudgetSuggestion";
import ExplanationPanel from "@/components/ExplanationPanel";
import ChatInterface from "@/components/ChatInterface";
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
      <div className="max-w-7xl mx-auto space-y-8">
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

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Left Column - Budget Suggestion */}
          <div className="lg:col-span-2">
            <BudgetSuggestion 
              selectedCanton={selectedCanton}
              selectedAccount={selectedAccount}
            />
          </div>

          {/* Middle Column - Explanation */}
          <div className="lg:col-span-2">
            <ExplanationPanel />
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-3">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
