import { MenuItem } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

const MenuSection = ({ category, items, onItemClick }: MenuSectionProps) => {
  const isAllItems = category === "All Items";
  const isMobile = useIsMobile();
  
  // For "All Items", mix circular and card layouts
  // 8 items on mobile (2 rows of 4), 16 on larger screens (2 rows of 8)
  const circularCount = isMobile ? 8 : 16;
  const circularItems = isAllItems ? items.slice(0, circularCount) : [];
  const cardItems = isAllItems ? items.slice(circularCount) : items;

  return (
    <section className="py-8">
      <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
        {category}
      </h2>
      
      {isAllItems && circularItems.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            What's On Your Mind?
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-12">
            {circularItems.map((item, index) => (
              <MenuItemCard 
                key={`circle-${item.name}-${index}`} 
                item={item}
                onClick={() => onItemClick(item)}
                variant="circle"
              />
            ))}
          </div>
          
          <div className="border-t border-border my-8" />
          
          <h3 className="text-2xl font-bold text-foreground mb-6">
            All Dishes
          </h3>
        </>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardItems.map((item, index) => (
          <MenuItemCard 
            key={`${item.name}-${index}`} 
            item={item}
            onClick={() => onItemClick(item)}
            variant="card"
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
