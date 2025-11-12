import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import AddressForm from "./AddressForm";
import { Separator } from "@/components/ui/separator";

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

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getItemCount } = useCart();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddressSubmit = (data: AddressData) => {
    const phoneNumber = "917908288829";
    
    const locationLink = data.location 
      ? `https://www.google.com/maps?q=${data.location.lat},${data.location.lng}`
      : '';
    
    const itemsList = cartItems.map((cartItem, index) => {
      const price = cartItem.portion === "half" && cartItem.item.half
        ? cartItem.item.half
        : cartItem.item.price;
      const portionText = cartItem.item.half ? ` (${cartItem.portion === "half" ? "Half" : "Full"})` : '';
      const itemTotal = price * cartItem.quantity;
      
      return `${index + 1}. ${cartItem.item.name}${portionText}\n   Qty: ${cartItem.quantity} × ₹${price} = ₹${itemTotal}`;
    }).join('\n\n');
    
    const totalPrice = getTotalPrice();
    
    const message = `🍽️ *New Order Request*

📦 *Items:*
${itemsList}

💵 *Total Amount:* ₹${totalPrice}

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
    
    window.location.href = whatsappUrl;
    
    setTimeout(() => {
      setIsOpen(false);
      setShowAddressForm(false);
      clearCart();
    }, 500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setShowAddressForm(false);
    }}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-primary/10 hover:border-primary transition-all"
        >
          <ShoppingCart className="h-5 w-5" />
          {getItemCount() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            {showAddressForm ? "Delivery Details" : "Your Cart"}
          </SheetTitle>
        </SheetHeader>

        {!showAddressForm ? (
          <div className="mt-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add items from the menu to get started</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((cartItem, index) => {
                    const price = cartItem.portion === "half" && cartItem.item.half
                      ? cartItem.item.half
                      : cartItem.item.price;
                    const portionText = cartItem.item.half ? ` (${cartItem.portion === "half" ? "Half" : "Full"})` : '';
                    
                    return (
                      <div key={index} className="flex gap-3 p-4 bg-muted/30 rounded-lg border">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {cartItem.item.name}{portionText}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">₹{price} each</p>
                          <div className="flex items-center gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, Math.max(1, cartItem.quantity - 1))}
                              disabled={cartItem.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold w-8 text-center">{cartItem.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, cartItem.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <p className="font-bold text-primary text-lg">₹{price * cartItem.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center text-xl font-bold px-2">
                  <span>Total:</span>
                  <span className="text-primary">₹{getTotalPrice()}</span>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    onClick={() => setShowAddressForm(true)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Proceed to Order
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <AddressForm
              itemName={`${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`}
              itemPrice={getTotalPrice()}
              quantity={1}
              onSubmit={handleAddressSubmit}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
