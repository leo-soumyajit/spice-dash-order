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
import AddressForm from "./AddressForm";
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
      {/* Zomato-style Bottom Bar - Flush to bottom on mobile, centered pill on desktop */}
      {!isOpen && (
        <>
          {/* Mobile - Full width bar at bottom */}
          <div className="md:hidden fixed inset-x-0 bottom-0 z-40">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="w-full bg-primary text-primary-foreground shadow-2xl transition-transform active:scale-[0.99]"
            >
              <div className="px-4 py-4 flex items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)]">
                <div className="text-left flex-shrink-0">
                  <p className="text-[11px] font-medium opacity-90 leading-tight">{itemCount} Item{itemCount > 1 ? 's' : ''}</p>
                  <p className="text-lg font-bold leading-tight mt-0.5">₹{totalPrice}</p>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">View Cart</span>
              </div>
            </button>
          </div>

          {/* Desktop - Centered pill */}
          <div className="hidden md:block fixed inset-x-0 bottom-6 z-40 pointer-events-none">
            <div className="pointer-events-auto mx-auto w-full max-w-2xl px-4">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-[1.01] transition-transform"
              >
                <div className="px-6 py-3.5 flex items-center justify-between">
                  <span className="text-sm">{itemCount} item{itemCount > 1 ? 's' : ''}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold">₹{totalPrice}</span>
                    <span className="text-sm font-semibold">View Cart</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Cart Drawer */}
      <Drawer open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setShowAddressForm(false);
      }}>
        <DrawerContent className="h-[90vh] md:h-[85vh]">
          <div className="mx-auto w-full max-w-full md:max-w-2xl flex flex-col h-full">
            <DrawerHeader className="text-left border-b pb-3 px-4 md:px-6 shrink-0">
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
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ScrollArea className="h-full px-4 md:px-6">
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
                </div>

                <DrawerFooter className="border-t pt-3 pb-4 px-4 md:px-6 shrink-0 safe-area-pb">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold text-foreground">₹{totalPrice}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                    <Button
                      onClick={() => setShowAddressForm(true)}
                      className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                      size="lg"
                    >
                      Proceed to Order
                    </Button>
                  </div>
                </DrawerFooter>
              </>
            ) : (
              <>
                <div className="flex-1 min-h-0 overflow-hidden px-4 md:px-6 py-4">
                  <ScrollArea className="h-full">
                    <AddressForm
                      itemName={`${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`}
                      itemPrice={totalPrice}
                      quantity={1}
                      onSubmit={handleAddressSubmit}
                    />
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
