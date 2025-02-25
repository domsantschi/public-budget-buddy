
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

        {/* Main Content - Three Column Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Budget Analysis */}
          <div className="space-y-6">
            <BudgetSuggestion 
              selectedCanton={selectedCanton}
              selectedAccount={selectedAccount}
            />
            <ExplanationPanel />
          </div>

          {/* Middle Column - Chat */}
          <div className="flex h-full">
            <ChatInterface />
          </div>

          {/* Right Column - Export Preview */}
          <div className="flex h-full">
            <ExportPreview 
              selectedCanton={selectedCanton}
              selectedAccount={selectedAccount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
