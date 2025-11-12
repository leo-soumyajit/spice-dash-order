import { MenuItem } from "@/data/menuData";
import { Eye } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

const MenuItemCard = ({ item, onClick }: MenuItemCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-border cursor-pointer group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">₹{item.price}</span>
          {item.half && (
            <span className="text-sm text-muted-foreground">
              (Half: ₹{item.half})
            </span>
          )}
        </div>

        <div className="mt-4 text-sm text-primary font-medium group-hover:underline">
          Click to view details & order
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
