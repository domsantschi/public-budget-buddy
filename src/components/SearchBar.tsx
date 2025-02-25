
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
  CommandTitle,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

interface BudgetAccount {
  id: number;
  account_number: number;
  name: string;
  category: string;
}

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [accounts, setAccounts] = useState<BudgetAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchAccounts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('budget_accounts')
          .select('*')
          .ilike('name', `%${search}%`)

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

    searchAccounts();
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

  return (
    <>
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
        <DialogTitle className="text-center">Search Budget Accounts</DialogTitle>
        <CommandInput 
          placeholder="Search accounts by name..."
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
              accounts.reduce((acc: { [key: string]: BudgetAccount[] }, account) => {
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
    </>
  );
};

export default SearchBar;
