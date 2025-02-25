import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetAccount {
  id: number;
  account_number: number;
  name: string;
  category: string;
}

const DEMO_ACCOUNTS: BudgetAccount[] = [
  { id: 1, account_number: 1, name: "Aktiven", category: "Aktiven" },
  { id: 2, account_number: 2, name: "Passiven", category: "Passiven" },
  { id: 3, account_number: 3, name: "Aufwand", category: "Aufwand" },
  { id: 4, account_number: 4, name: "Ertrag", category: "Ertrag" },
  { id: 5, account_number: 5, name: "Investitionsausgaben gesamt", category: "Investitionsausgaben" },
  { id: 6, account_number: 6, name: "Investitionseinnahmen gesamt", category: "Investitionseinnahmen" },
  { id: 7, account_number: 30, name: "Personalaufwand", category: "Aufwand" },
  { id: 8, account_number: 31, name: "Sach- und übriger Betriebsaufwand", category: "Aufwand" },
  { id: 9, account_number: 33, name: "Abschreibungen VV", category: "Aufwand" },
  { id: 10, account_number: 35, name: "Einlagen in Fonds und Spezialfinanzierungen", category: "Aufwand" },
  { id: 11, account_number: 36, name: "Transferaufwand", category: "Aufwand" },
  { id: 12, account_number: 37, name: "Durchlaufende Beiträge", category: "Aufwand" },
  { id: 13, account_number: 39, name: "Interne Verrechungen", category: "Aufwand" },
  { id: 14, account_number: 40, name: "Fiskalertrag", category: "Ertrag" },
  { id: 15, account_number: 41, name: "Regalien und Konzessionen", category: "Ertrag" },
  { id: 16, account_number: 42, name: "Entgelte", category: "Ertrag" },
  { id: 17, account_number: 43, name: "Verschiedene Erträge", category: "Ertrag" },
  { id: 18, account_number: 45, name: "Entnahmen aus Fonds und Spezialfinanzierungen", category: "Ertrag" },
  { id: 19, account_number: 46, name: "Transferertrag", category: "Ertrag" },
  { id: 20, account_number: 47, name: "Durchlaufende Beiträge", category: "Ertrag" },
  { id: 21, account_number: 49, name: "Interne Verrechnungen", category: "Ertrag" },
  { id: 22, account_number: 34, name: "Finanzaufwand", category: "Aufwand" },
  { id: 23, account_number: 44, name: "Finanzertrag", category: "Ertrag" },
  { id: 24, account_number: 38, name: "Ausserordentlicher Aufwand", category: "Aufwand" },
  { id: 25, account_number: 48, name: "Ausserordentlicher Ertrag", category: "Ertrag" },
  { id: 26, account_number: 50, name: "Sachanlagen", category: "Investitionsausgaben" },
  { id: 27, account_number: 51, name: "Investitionen auf Rechnung Dritter", category: "Investitionsausgaben" },
  { id: 28, account_number: 52, name: "Immaterielle Anlagen", category: "Investitionsausgaben" },
  { id: 29, account_number: 54, name: "Darlehen", category: "Investitionsausgaben" },
  { id: 30, account_number: 55, name: "Beteiligungen und Grundkapitalien", category: "Investitionsausgaben" },
  { id: 31, account_number: 56, name: "Eigene Investitionsbeiträge", category: "Investitionsausgaben" },
  { id: 32, account_number: 57, name: "Durchlaufende Investitionsbeiträge", category: "Investitionsausgaben" },
  { id: 33, account_number: 58, name: "Ausserordentliche Investitionen", category: "Investitionsausgaben" },
  { id: 34, account_number: 60, name: "Übertragung von Sachanlagen in das FV", category: "Investitionseinnahmen" },
  { id: 35, account_number: 61, name: "Rückerstattungen Dritter für Investitionen", category: "Investitionseinnahmen" },
  { id: 36, account_number: 62, name: "Abgang immaterielle Anlagen", category: "Investitionseinnahmen" },
  { id: 37, account_number: 63, name: "Investitionsbeiträge für eigene Rechnung", category: "Investitionseinnahmen" },
  { id: 38, account_number: 64, name: "Rückzahlung von Darlehen", category: "Investitionseinnahmen" },
  { id: 39, account_number: 65, name: "Übertragung von Beteiligungen", category: "Investitionseinnahmen" },
  { id: 40, account_number: 66, name: "Rückzahlung eigener Investitionsbeiträge", category: "Investitionseinnahmen" },
  { id: 41, account_number: 67, name: "Durchlaufende Investitionsbeiträge", category: "Investitionseinnahmen" },
  { id: 42, account_number: 68, name: "Ausserordentliche Investitionseinnahmen", category: "Investitionseinnahmen" },
  { id: 43, account_number: 14, name: "Verwaltungsvermögen", category: "Aktiven" },
  { id: 44, account_number: 29, name: "Eigenkapital", category: "Passiven" }
];

const SWISS_CANTONS = [
  { value: "ZH", label: "Zürich", logo: "/cantons/zurich.svg" },
  { value: "BE", label: "Bern", logo: "/cantons/bern.svg" },
  { value: "LU", label: "Luzern", logo: "/cantons/lucerne.svg" },
  { value: "UR", label: "Uri", logo: "/cantons/uri.svg" },
  { value: "SZ", label: "Schwyz", logo: "/cantons/schwyz.svg" },
  { value: "OW", label: "Obwalden", logo: "/cantons/obwalden.svg" },
  { value: "NW", label: "Nidwalden", logo: "/cantons/nidwalden.svg" },
  { value: "GL", label: "Glarus", logo: "/cantons/glarus.svg" },
  { value: "ZG", label: "Zug", logo: "/cantons/zug.svg" },
  { value: "FR", label: "Freiburg", logo: "/cantons/fribourg.svg" },
  { value: "SO", label: "Solothurn", logo: "/cantons/solothurn.svg" },
  { value: "BS", label: "Basel-Stadt", logo: "/cantons/basel-city.svg" },
  { value: "BL", label: "Basel-Landschaft", logo: "/cantons/basel-country.svg" },
  { value: "SH", label: "Schaffhausen", logo: "/cantons/schaffhausen.svg" },
  { value: "AR", label: "Appenzell Ausserrhoden", logo: "/cantons/appenzell-outer.svg" },
  { value: "AI", label: "Appenzell Innerrhoden", logo: "/cantons/appenzell-inner.svg" },
  { value: "SG", label: "St. Gallen", logo: "/cantons/st-gallen.svg" },
  { value: "GR", label: "Graubünden", logo: "/cantons/graubunden.svg" },
  { value: "AG", label: "Aargau", logo: "/cantons/aargau.svg" },
  { value: "TG", label: "Thurgau", logo: "/cantons/thurgau.svg" },
  { value: "TI", label: "Ticino", logo: "/cantons/ticino.svg" },
  { value: "VD", label: "Vaud", logo: "/cantons/vaud.svg" },
  { value: "VS", label: "Valais", logo: "/cantons/valais.svg" },
  { value: "NE", label: "Neuchâtel", logo: "/cantons/neuchatel.svg" },
  { value: "GE", label: "Geneva", logo: "/cantons/geneva.svg" },
  { value: "JU", label: "Jura", logo: "/cantons/jura.svg" }
];

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState<BudgetAccount[]>(DEMO_ACCOUNTS);
  const [loading, setLoading] = useState(false);
  const [selectedCanton, setSelectedCanton] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<BudgetAccount | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Aktiven': 'bg-blue-500',
      'Passiven': 'bg-red-500',
      'Aufwand': 'bg-yellow-500',
      'Ertrag': 'bg-green-500',
      'Investitionsausgaben': 'bg-purple-500',
      'Investitionseinnahmen': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const filteredAccounts = DEMO_ACCOUNTS.filter(account => {
    if (!search.trim()) return true;
    
    return (
      account.name.toLowerCase().includes(search.toLowerCase()) ||
      account.category.toLowerCase().includes(search.toLowerCase()) ||
      account.account_number.toString().includes(search)
    );
  });

  const selectedCantonData = SWISS_CANTONS.find(canton => canton.value === selectedCanton);

  return (
    <div className="space-y-4">
      <div className="w-full max-w-xs">
        <Select value={selectedCanton} onValueChange={setSelectedCanton}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a canton">
              {selectedCantonData && (
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedCantonData.logo}
                    alt={`${selectedCantonData.label} canton flag`}
                    className="w-5 h-5 object-contain"
                  />
                  <span>{selectedCantonData.label}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {SWISS_CANTONS.map((canton) => (
              <SelectItem 
                key={canton.value} 
                value={canton.value}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src={canton.logo}
                    alt={`${canton.label} canton flag`}
                    className="w-5 h-5 object-contain"
                  />
                  <span>{canton.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input 
          type="search" 
          placeholder={selectedAccount 
            ? `${selectedAccount.account_number} - ${selectedAccount.name}`
            : "Search budget accounts... (Press ⌘K)"
          }
          className="pl-10 bg-white/50 backdrop-blur-sm border-muted"
          onClick={() => setOpen(true)}
          readOnly
        />
        {selectedAccount && (
          <Badge 
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${getCategoryColor(selectedAccount.category)} text-white`}
          >
            {selectedAccount.category}
          </Badge>
        )}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="text-center p-2">Search Budget Accounts</DialogTitle>
        <CommandInput 
          placeholder="Search by name, number, or category..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {loading ? (
            <CommandGroup heading="Loading...">
              <CommandItem disabled>Searching accounts...</CommandItem>
            </CommandGroup>
          ) : (
            Object.entries(
              filteredAccounts.reduce((acc: { [key: string]: BudgetAccount[] }, account) => {
                if (!acc[account.category]) {
                  acc[account.category] = [];
                }
                acc[account.category].push(account);
                return acc;
              }, {})
            ).map(([category, categoryAccounts]) => (
              <CommandGroup key={category} heading={category}>
                {categoryAccounts.map((account) => (
                  <CommandItem
                    key={account.id}
                    value={`${account.account_number} ${account.name}`}
                    onSelect={() => {
                      setSelectedAccount(account);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {account.account_number}
                      </Badge>
                      <span>{account.name}</span>
                      <Badge 
                        className={`ml-auto ${getCategoryColor(account.category)} text-white`}
                      >
                        {account.category}
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
