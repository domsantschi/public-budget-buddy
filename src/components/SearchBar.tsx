
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input 
        type="search" 
        placeholder="Search budget accounts..." 
        className="pl-10 bg-white/50 backdrop-blur-sm border-muted"
      />
    </div>
  );
};

export default SearchBar;
