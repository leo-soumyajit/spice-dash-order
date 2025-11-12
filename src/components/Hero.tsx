import heroImage from "@/assets/hero-food.jpg";

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Spice Haven
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 font-medium">
            Authentic Indian Flavors, Delivered to Your Door
          </p>
          <div className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-full font-semibold text-lg shadow-lg animate-scale-in">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free Home Delivery Within 1 KM
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
