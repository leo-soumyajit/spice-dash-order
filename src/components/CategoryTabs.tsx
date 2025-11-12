import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-3 sm:py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 text-sm sm:text-base",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-card-foreground border-2 border-border hover:border-primary"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
