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
  const [accounts, setAccounts] = useState<BudgetAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCanton, setSelectedCanton] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const searchAccounts = async () => {
      try {
        setLoading(true);
        
        if (!search.trim()) {
          const { data, error } = await supabase
            .from('budget_accounts')
            .select('*')
            .order('account_number');

          if (error) throw error;
          setAccounts(data || []);
          return;
        }

        const { data, error } = await supabase
          .from('budget_accounts')
          .select('*')
          .or(`name.ilike.%${search}%,account_number.eq.${!isNaN(Number(search)) ? search : 0}`)
          .order('account_number');

        if (error) {
          console.error('Error fetching accounts:', error);
          return;
        }

        setAccounts(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchAccounts, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

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

  const filteredAccounts = accounts.filter(account => {
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
          placeholder="Search budget accounts... (Press ⌘K)" 
          className="pl-10 bg-white/50 backdrop-blur-sm border-muted"
          onClick={() => setOpen(true)}
          readOnly
        />
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
                      console.log('Selected:', account);
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
