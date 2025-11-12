import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchBarProps {
  allItems: { item: MenuItem; category: string }[];
  onItemClick: (item: MenuItem) => void;
}

const SearchBar = ({ allItems, onItemClick }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<{ item: MenuItem; category: string }[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allItems.filter(
      ({ item }) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  }, [searchQuery, allItems]);

  const handleItemSelect = (item: MenuItem) => {
    onItemClick(item);
    setIsOpen(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted/50 border-2 border-border rounded-full transition-all duration-300 hover:border-primary hover:scale-105 shadow-md"
      >
        <Search className="w-5 h-5 text-muted-foreground" />
        <span className="hidden sm:inline text-muted-foreground font-medium">
          Search dishes...
        </span>
      </button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-2xl font-bold">Search Menu</DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for dishes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-12 text-lg border-2 focus:border-primary"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="h-[400px] px-6 pb-6">
            {searchQuery.trim() === "" ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Start typing to search our delicious menu</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No dishes found matching "{searchQuery}"</p>
                <p className="text-sm mt-2">Try searching for something else</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map(({ item, category }, index) => (
                  <button
                    key={`${item.name}-${index}`}
                    onClick={() => handleItemSelect(item)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-md group"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">₹{item.price}</p>
                        {item.half && (
                          <p className="text-xs text-muted-foreground">Half: ₹{item.half}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
