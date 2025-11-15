import { useState, useEffect } from 'react';

export interface RestaurantHours {
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
}

const RESTAURANT_HOURS: RestaurantHours = {
  openHour: 11,
  openMinute: 30,
  closeHour: 23,
  closeMinute: 30,
};

export const useRestaurantHours = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [nextOpenTime, setNextOpenTime] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkRestaurantStatus = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      const openTimeInMinutes = RESTAURANT_HOURS.openHour * 60 + RESTAURANT_HOURS.openMinute;
      const closeTimeInMinutes = RESTAURANT_HOURS.closeHour * 60 + RESTAURANT_HOURS.closeMinute;
      
      const isCurrentlyOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
      
      setIsOpen(isCurrentlyOpen);
      
      if (!isCurrentlyOpen) {
        // Calculate next opening time
        const tomorrow = new Date(now);
        if (currentTimeInMinutes >= closeTimeInMinutes) {
          tomorrow.setDate(tomorrow.getDate() + 1);
        }
        tomorrow.setHours(RESTAURANT_HOURS.openHour, RESTAURANT_HOURS.openMinute, 0, 0);
        
        const hours = String(RESTAURANT_HOURS.openHour).padStart(2, '0');
        const minutes = String(RESTAURANT_HOURS.openMinute).padStart(2, '0');
        const ampm = RESTAURANT_HOURS.openHour >= 12 ? 'PM' : 'AM';
        const displayHour = RESTAURANT_HOURS.openHour > 12 ? RESTAURANT_HOURS.openHour - 12 : RESTAURANT_HOURS.openHour;
        
        setNextOpenTime(`${displayHour}:${minutes} ${ampm}`);
      }
    };

    checkRestaurantStatus();
    const interval = setInterval(checkRestaurantStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const getOpeningHours = () => {
    const openHour = RESTAURANT_HOURS.openHour > 12 ? RESTAURANT_HOURS.openHour - 12 : RESTAURANT_HOURS.openHour;
    const closeHour = RESTAURANT_HOURS.closeHour > 12 ? RESTAURANT_HOURS.closeHour - 12 : RESTAURANT_HOURS.closeHour;
    const openMinutes = String(RESTAURANT_HOURS.openMinute).padStart(2, '0');
    const closeMinutes = String(RESTAURANT_HOURS.closeMinute).padStart(2, '0');
    const openAmPm = RESTAURANT_HOURS.openHour >= 12 ? 'PM' : 'AM';
    const closeAmPm = RESTAURANT_HOURS.closeHour >= 12 ? 'PM' : 'AM';
    
    return `${openHour}:${openMinutes} ${openAmPm} - ${closeHour}:${closeMinutes} ${closeAmPm}`;
  };

  return {
    isOpen,
    nextOpenTime,
    openingHours: getOpeningHours(),
    currentTime,
  };
};
