import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MenuItem } from "@/data/menuData";
import { MessageCircle } from "lucide-react";

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

interface MenuItemDialogProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const MenuItemDialog = ({ item, open, onOpenChange }: MenuItemDialogProps) => {
  if (!item) return null;

  const handleWhatsAppOrder = () => {
    const phoneNumber = "917908288829";
    const message = `Hi! I want to order ${item.name} - ₹${item.price}. Please confirm availability.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const imageSrc = imageMap[item.image] || chickenCurry;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {item.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={imageSrc} 
              alt={item.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          <DialogDescription className="text-base text-foreground/80 leading-relaxed">
            {item.description}
          </DialogDescription>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-4xl font-bold text-primary">₹{item.price}</span>
            {item.half && (
              <span className="text-lg text-muted-foreground">
                (Half: ₹{item.half})
              </span>
            )}
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Order via WhatsApp
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
