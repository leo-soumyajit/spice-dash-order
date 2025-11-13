import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import MenuSection from "@/components/MenuSection";
import MenuItemDialog from "@/components/MenuItemDialog";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { NotificationBanner } from "@/components/NotificationBanner";
import { CartProvider } from "@/contexts/CartContext";
import { menuData, categories, MenuItem } from "@/data/menuData";
import { useNotifications } from "@/hooks/use-notifications";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Initialize notifications
  useNotifications();

  // Flatten all menu items for search
  const allMenuItems = useMemo(() => {
    return Object.entries(menuData).flatMap(([category, items]) =>
      items.map(item => ({ item, category }))
    );
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar allItems={allMenuItems} onItemClick={handleItemClick} />
        <NotificationBanner />
        <Hero />
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <MenuSection 
            category={activeCategory}
            items={menuData[activeCategory]}
            onItemClick={handleItemClick}
          />
        </main>

        <MenuItemDialog 
          item={selectedItem}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />

        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
