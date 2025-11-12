import { Phone, MapPin, Clock, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Restaurant Info */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
              Spice Haven
            </h3>
            <p className="text-primary-foreground/90 mb-4 max-w-md leading-relaxed">
              Authentic Indian cuisine crafted with love and the finest spices. Experience the rich flavors and traditions of India in every dish.
            </p>
          </div>
          
          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wide">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+917908288829" className="flex items-center gap-3 hover:text-primary-foreground/80 transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+91 79082 88829</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/90">Your Address Here</span>
              </div>
            </div>
          </div>
          
          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wide">Business Hours</h4>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Monday - Sunday</p>
                <p className="text-primary-foreground/80">11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {new Date().getFullYear()} Spice Haven. All rights reserved.
            </p>
            
            {/* ULMiND Attribution */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary-foreground/70">Developed by</span>
              <a 
                href="https://www.ulmind.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold hover:text-primary-foreground/90 transition-colors inline-flex items-center gap-1.5 group"
              >
                <Globe className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                ULMiND
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
