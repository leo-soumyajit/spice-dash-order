import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MenuItem } from "@/data/menuData";
import { ArrowLeft } from "lucide-react";
import AddressForm from "./AddressForm";
import { Button } from "@/components/ui/button";

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

interface AddressData {
  name: string;
  phone: string;
  address: string;
  instructions?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

const MenuItemDialog = ({ item, open, onOpenChange }: MenuItemDialogProps) => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  if (!item) return null;

  const handleOrderClick = () => {
    setShowAddressForm(true);
  };

  const handleAddressSubmit = (data: AddressData) => {
    const phoneNumber = "917908288829";
    
    // Create Google Maps link if location is available
    const locationLink = data.location 
      ? `https://www.google.com/maps?q=${data.location.lat},${data.location.lng}`
      : '';
    
    const message = `🍽️ *New Order Request*

📦 *Item:* ${item.name}
💰 *Price:* ₹${item.price}${item.half ? ` (Half: ₹${item.half})` : ''}

👤 *Customer Details:*
Name: ${data.name}
Phone: ${data.phone}

📍 *Delivery Address:*
${data.address}
${data.location ? `\n📌 *Exact Location:*\n${data.location.address}\n\n🗺️ *Map Link:*\n${locationLink}` : ''}

${data.instructions ? `📝 *Special Instructions:*\n${data.instructions}\n` : ''}
Please confirm this order. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
    
    // Close the dialog after a short delay
    setTimeout(() => {
      onOpenChange(false);
      setShowAddressForm(false);
    }, 500);
  };

  const handleBackClick = () => {
    setShowAddressForm(false);
  };

  const imageSrc = imageMap[item.image] || chickenCurry;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        setShowAddressForm(false);
      }
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {showAddressForm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <DialogTitle className="text-2xl font-bold text-foreground">
              {showAddressForm ? "Delivery Details" : item.name}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        {!showAddressForm ? (
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

            <Button
              onClick={handleOrderClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Proceed to Order
            </Button>
          </div>
        ) : (
          <AddressForm
            itemName={item.name}
            itemPrice={item.price}
            onSubmit={handleAddressSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
