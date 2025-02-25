
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, FileText, MessageSquare, PenLine } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface ExportPreviewProps {
  selectedCanton?: string;
  selectedAccount?: { 
    id: number;
    account_number: number;
    name: string;
    category: string;
  } | null;
}

const ExportPreview = ({ selectedCanton, selectedAccount }: ExportPreviewProps) => {
  const [notes, setNotes] = useState("");

  return (
    <Card className="h-full flex flex-col animate-fade-in bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Export Preview</h3>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* Prediction Summary */}
          <section className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              Budget Prediction Summary
            </h4>
            <div className="text-sm text-muted-foreground">
              <p>Selected Canton: {selectedCanton || "Not selected"}</p>
              <p>Account: {selectedAccount?.name || "Not selected"}</p>
              <p>Category: {selectedAccount?.category || "N/A"}</p>
              <p>Confidence Level: 92%</p>
              <p>Historical Data Range: 2010-2024</p>
              <p>Projection Range: 2025-2030</p>
            </div>
          </section>

          {/* Chat Transcript */}
          <section className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Assistant Conversation
            </h4>
            <div className="text-sm text-muted-foreground border rounded-md p-2 bg-white/50">
              <p className="mb-2">Transcript will be automatically updated as you chat with the Budget Assistant.</p>
            </div>
          </section>

          {/* Additional Notes */}
          <section className="space-y-2">
            <h4 className="font-semibold">Additional Notes</h4>
            <Textarea
              placeholder="Add your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </section>
        </div>
      </div>
    </Card>
  );
};

export default ExportPreview;
