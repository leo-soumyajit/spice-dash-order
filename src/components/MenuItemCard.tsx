import { MenuItem } from "@/data/menuData";
import { Eye } from "lucide-react";

// Import all images
import chickenCurry from "@/assets/chicken-curry.jpg";
import chickenPakora from "@/assets/chicken-pakora.jpg";
import vegetarian from "@/assets/vegetarian.jpg";
import biryani from "@/assets/biryani.jpg";
import bread from "@/assets/bread.jpg";
import rolls from "@/assets/rolls.jpg";
import vegRice from "@/assets/veg-rice.jpg";
import nonVegRice from "@/assets/non-veg-rice.jpg";
import chowmein from "@/assets/chowmein.jpg";

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

const imageMap: Record<string, string> = {
  "chicken-curry": chickenCurry,
  "chicken-pakora": chickenPakora,
  "vegetarian": vegetarian,
  "biryani": biryani,
  "bread": bread,
  "rolls": rolls,
  "veg-rice": vegRice,
  "non-veg-rice": nonVegRice,
  "chowmein": chowmein,
};

const MenuItemCard = ({ item, onClick }: MenuItemCardProps) => {
  const imageSrc = imageMap[item.image] || chickenCurry;

  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-border cursor-pointer group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 group-hover:bg-primary group-hover:text-white transition-all">
          <Eye className="w-5 h-5" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors mb-2">
          {item.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
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

        <div className="mt-4 text-sm text-primary font-medium group-hover:underline flex items-center gap-2">
          <span>Click to view details & order</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
