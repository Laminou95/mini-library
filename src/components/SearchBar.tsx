
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SortAsc, SortDesc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'title' | 'author' | 'year';
  sortOrder: 'asc' | 'desc';
  onSortByChange: (value: 'title' | 'author' | 'year') => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher par titre, auteur ou année..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px]">
              Trier par: {sortBy === 'title' ? 'Titre' : sortBy === 'author' ? 'Auteur' : 'Année'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onSortByChange('title')}>
              Titre
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortByChange('author')}>
              Auteur
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortByChange('year')}>
              Année
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
