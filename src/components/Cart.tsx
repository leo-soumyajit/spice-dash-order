import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
// removed Badge import (not used)
import AddressForm from "./AddressForm";
// removed Separator import (not used)
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

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

  // Don't show cart if empty
  if (itemCount === 0) return null;

  return (
    <>
      {/* Zomato-style Bottom Bar (Mobile only, flush to bottom). Hidden when cart is open */}
      {!isOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
          <div
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto bg-primary text-primary-foreground rounded-none shadow-2xl cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]"
          >
            <div className="px-5 py-3.5 flex items-center justify-between pb-[env(safe-area-inset-bottom)]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive border-2 border-primary">
                    {itemCount}
                  </Badge>
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium opacity-90">{itemCount} item{itemCount > 1 ? 's' : ''}</p>
                  <p className="text-base font-bold">₹{totalPrice}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">View Cart</span>
                <ChevronUp className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <Drawer open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setShowAddressForm(false);
      }}>
        <DrawerContent className="max-h-[90vh] md:max-h-[85vh]">
          <div className="mx-auto w-full max-w-full md:max-w-2xl px-4 md:px-0">
            <DrawerHeader className="text-left border-b pb-4">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-2xl font-bold">
                  {showAddressForm ? "Delivery Details" : "Your Cart"}
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
              {!showAddressForm && (
                <DrawerDescription className="text-sm text-muted-foreground mt-1">
                  {itemCount} item{itemCount > 1 ? 's' : ''} in your cart
                </DrawerDescription>
              )}
            </DrawerHeader>

            {!showAddressForm ? (
              <>
                <ScrollArea className="h-[calc(90vh-240px)] md:h-[calc(85vh-220px)] px-4 md:px-6">
                  <div className="space-y-3 py-4">
                    {cartItems.map((cartItem, index) => {
                      const price = cartItem.portion === "half" && cartItem.item.half
                        ? cartItem.item.half
                        : cartItem.item.price;
                      const portionText = cartItem.item.half ? ` (${cartItem.portion === "half" ? "Half" : "Full"})` : '';
                      
                      return (
                        <div key={index} className="flex gap-3 p-4 bg-muted/30 rounded-lg border hover:border-primary/30 transition-colors">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {cartItem.item.name}{portionText}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">₹{price} each</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-md"
                                onClick={() => updateQuantity(index, Math.max(1, cartItem.quantity - 1))}
                                disabled={cartItem.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-semibold w-8 text-center text-sm">{cartItem.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-md"
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
                            <p className="font-bold text-primary text-lg whitespace-nowrap">₹{price * cartItem.quantity}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                <DrawerFooter className="border-t pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold text-foreground">₹{totalPrice}</p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cart
                      </Button>
                    </div>
                    <Button
                      onClick={() => setShowAddressForm(true)}
                      className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      Proceed to Order
                    </Button>
                  </div>
                </DrawerFooter>
              </>
            ) : (
              <div className="px-4 md:px-6 py-4">
                <ScrollArea className="h-[calc(90vh-140px)] md:h-[calc(85vh-140px)]">
                  <AddressForm
                    itemName={`${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`}
                    itemPrice={totalPrice}
                    quantity={1}
                    onSubmit={handleAddressSubmit}
                  />
                </ScrollArea>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
