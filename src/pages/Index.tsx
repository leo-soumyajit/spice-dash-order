import { useState } from "react";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import { menuData, categories } from "@/data/menuData";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CategoryTabs 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuSection 
          category={activeCategory}
          items={menuData[activeCategory]}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
