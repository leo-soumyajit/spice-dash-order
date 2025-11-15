import heroImage from "@/assets/hero-food.jpg";
import { useRestaurantHours } from "@/hooks/use-restaurant-hours";
import { Clock, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const { isOpen, nextOpenTime, openingHours } = useRestaurantHours();

  return (
    <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/45 to-accent/10 dark:from-primary/30 dark:via-primary/40 dark:to-accent/10" />
        {!isOpen && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        )}
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
            Spice Haven
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-6 sm:mb-8 font-medium px-4">
            Authentic Indian Flavors, Delivered to Your Door
          </p>
          
          {isOpen ? (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg animate-scale-in">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Free Home Delivery Within 1 KM</span>
                <span className="sm:hidden">Free Delivery (1 KM)</span>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-green-600/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>Open Now • {openingHours}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="bg-red-600/90 backdrop-blur-sm text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-red-400/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Currently Closed</h2>
                </div>
                <p className="text-red-100 text-sm">
                  We're closed for the day. Our kitchen is preparing fresh dishes for tomorrow!
                </p>
              </div>
              
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-foreground px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-sm font-medium text-muted-foreground mb-1">We'll be back at</p>
                <p className="text-2xl font-bold text-primary">{nextOpenTime}</p>
                <p className="text-xs text-muted-foreground mt-2">Regular Hours: {openingHours}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
