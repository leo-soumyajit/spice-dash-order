import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, MapPin, User, Phone, FileText } from "lucide-react";

const addressFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  phone: z.string()
    .trim()
    .regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit mobile number" }),
  address: z.string()
    .trim()
    .min(10, { message: "Please provide a complete address (minimum 10 characters)" })
    .max(300, { message: "Address must be less than 300 characters" }),
  instructions: z.string()
    .trim()
    .max(200, { message: "Instructions must be less than 200 characters" })
    .optional(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressFormProps {
  itemName: string;
  itemPrice: number;
  onSubmit: (data: AddressFormValues) => void;
}

const AddressForm = ({ itemName, itemPrice, onSubmit }: AddressFormProps) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      instructions: "",
    },
  });

  return (
    <div className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-4 border-2 border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{itemName}</span>
          <span className="text-xl font-bold text-primary">₹{itemPrice}</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field}
                    className="border-2 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter 10-digit mobile number" 
                    {...field}
                    maxLength={10}
                    className="border-2 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter complete address with landmark" 
                    {...field}
                    rows={3}
                    className="border-2 focus:border-primary resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Special Instructions (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any special delivery instructions or food preferences" 
                    {...field}
                    rows={2}
                    className="border-2 focus:border-primary resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold py-6 text-lg rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Send Order via WhatsApp
          </Button>
        </form>
      </Form>

      <p className="text-xs text-center text-muted-foreground">
        Your order details will be sent to the restaurant via WhatsApp
      </p>
    </div>
  );
};

export default AddressForm;
