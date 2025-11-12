import { MenuItem } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
}

const MenuSection = ({ category, items }: MenuSectionProps) => {
  return (
    <section className="py-8">
      <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
        {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <MenuItemCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
