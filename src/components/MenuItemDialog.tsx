import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MenuItem } from "@/data/menuData";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

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
  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState<"full" | "half">("full");
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity, portion);
    toast({
      title: "Added to cart",
      description: `${item.name} ${item.half ? `(${portion})` : ''} × ${quantity}`,
    });
    onOpenChange(false);
    setQuantity(1);
    setPortion("full");
  };

  const imageSrc = imageMap[item.image] || chickenCurry;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        setShowAddressForm(false);
        setQuantity(1);
        setPortion("full");
      }
    }}>
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

            {item.half && (
              <div className="space-y-3 p-4 bg-muted/30 rounded-xl border-2 border-primary/10">
                <Label className="text-sm font-semibold text-foreground">Select Portion Size</Label>
                <RadioGroup value={portion} onValueChange={(value) => setPortion(value as "full" | "half")} className="flex gap-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="cursor-pointer flex-1 text-sm">
                      Full - ₹{item.price}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="half" id="half" />
                    <Label htmlFor="half" className="cursor-pointer flex-1 text-sm">
                      Half - ₹{item.half}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-4xl font-bold text-primary">
                ₹{(portion === "half" && item.half ? item.half : item.price) * quantity}
              </span>
            </div>

            <div className="flex gap-3 items-stretch">
              <div className="flex items-center gap-2 border-2 border-primary/20 rounded-xl px-3 bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-auto p-2 hover:bg-primary/10"
                >
                  <span className="text-xl font-bold text-primary">−</span>
                </Button>
                <span className="text-xl font-bold text-foreground min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-auto p-2 hover:bg-primary/10"
                >
                  <span className="text-xl font-bold text-primary">+</span>
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
