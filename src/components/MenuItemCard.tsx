import { MenuItem } from "@/data/menuData";
import { MessageCircle } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const handleWhatsAppOrder = () => {
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
    const message = `Hi! I want to order ${item.name} - ₹${item.price}. Please confirm availability.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-border">
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-3">
          {item.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-primary">₹{item.price}</span>
          {item.half && (
            <span className="text-sm text-muted-foreground">
              (Half: ₹{item.half})
            </span>
          )}
        </div>

        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
