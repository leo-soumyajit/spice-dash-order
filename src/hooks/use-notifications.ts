import { useEffect, useCallback } from 'react';
import { useCart } from '@/contexts/CartContext';

interface NotificationSchedule {
  id: string;
  hour: number;
  minute: number;
  title: string;
  body: string;
  icon?: string;
}

const NOTIFICATION_SCHEDULES: NotificationSchedule[] = [
  {
    id: 'lunch',
    hour: 12,
    minute: 30,
    title: '🍽️ Lunchtime Cravings?',
    body: 'Delicious biryani, curries, and more waiting for you. Order now and satisfy your hunger!',
  },
  {
    id: 'snacks',
    hour: 17,
    minute: 0,
    title: '🍿 Evening Snack Time!',
    body: 'Crispy pakoras, rolls, and chowmein are calling. Perfect for your evening cravings!',
  },
  {
    id: 'dinner',
    hour: 20,
    minute: 30,
    title: '🌙 Dinner Delights Await',
    body: 'End your day with our special dishes. Fresh, hot, and ready to be delivered!',
  },
];

const STORAGE_KEYS = {
  PERMISSION: 'notification_permission_asked',
  LAST_NOTIFICATION: 'last_notification_sent',
  CART_REMINDER: 'cart_reminder_sent',
  CART_TIMESTAMP: 'cart_timestamp',
};

export const useNotifications = () => {
  const { cartItems } = useCart();

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      localStorage.setItem(STORAGE_KEYS.PERMISSION, 'true');
      return permission === 'granted';
    }

    return false;
  }, []);

  const sendNotification = useCallback((title: string, body: string, icon?: string) => {
    if (Notification.permission === 'granted') {
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDbF6/CFMAYAAAAAA');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore errors if sound fails
      
      const notification = new Notification(title, {
        body,
        icon: icon || '/favicon.png',
        badge: '/favicon.png',
        tag: 'food-delivery',
        requireInteraction: false,
        silent: false,
      });
      
      // Auto-close notification after 6 seconds
      setTimeout(() => notification.close(), 6000);
    }
  }, []);

  const checkScheduledNotifications = useCallback(() => {
    if (Notification.permission !== 'granted') return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const today = now.toDateString();
    const lastSent = localStorage.getItem(STORAGE_KEYS.LAST_NOTIFICATION);

    NOTIFICATION_SCHEDULES.forEach((schedule) => {
      const notificationKey = `${today}-${schedule.id}`;
      
      // Check if it's time for this notification and we haven't sent it today
      if (
        currentHour === schedule.hour &&
        currentMinute >= schedule.minute &&
        currentMinute < schedule.minute + 5 && // 5-minute window
        lastSent !== notificationKey
      ) {
        sendNotification(schedule.title, schedule.body, schedule.icon);
        localStorage.setItem(STORAGE_KEYS.LAST_NOTIFICATION, notificationKey);
      }
    });
  }, [sendNotification]);

  const checkCartAbandonment = useCallback(() => {
    if (Notification.permission !== 'granted') return;

    const cartTimestamp = localStorage.getItem(STORAGE_KEYS.CART_TIMESTAMP);
    const reminderSent = localStorage.getItem(STORAGE_KEYS.CART_REMINDER);

    if (cartItems.length > 0 && cartTimestamp) {
      const timeInCart = Date.now() - parseInt(cartTimestamp);
      const fiveMinutes = 5 * 60 * 1000;

      console.log('Cart check:', { timeInCart, fiveMinutes, reminderSent, cartTimestamp });

      // Send reminder after 5 minutes if not already sent
      if (timeInCart > fiveMinutes && reminderSent !== cartTimestamp) {
        console.log('Sending cart abandonment notification');
        sendNotification(
          '🛒 Your Cart is Waiting!',
          `You have ${cartItems.length} delicious item${cartItems.length > 1 ? 's' : ''} in your cart. Complete your order now!`
        );
        localStorage.setItem(STORAGE_KEYS.CART_REMINDER, cartTimestamp);
      }
    }
  }, [cartItems.length, sendNotification]);

  // Track last cart activity: update timestamp on every cart content change
  useEffect(() => {
    if (cartItems.length > 0) {
      // Update last activity timestamp and reset reminder flag
      const now = Date.now().toString();
      localStorage.setItem(STORAGE_KEYS.CART_TIMESTAMP, now);
      localStorage.removeItem(STORAGE_KEYS.CART_REMINDER);
    } else {
      // Clear when cart is empty
      localStorage.removeItem(STORAGE_KEYS.CART_TIMESTAMP);
      localStorage.removeItem(STORAGE_KEYS.CART_REMINDER);
    }
  }, [JSON.stringify(cartItems)]);

  // Poll checks (every 10s) + run immediately and on resume/focus
  useEffect(() => {
    const tick = () => {
      checkScheduledNotifications();
      checkCartAbandonment();
    };

    const interval = setInterval(tick, 10000);
    tick();

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tick();
    };
    const onFocus = () => tick();

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
    };
  }, [checkScheduledNotifications, checkCartAbandonment]);

  // Auto-request permission on first visit
  useEffect(() => {
    const hasAsked = localStorage.getItem(STORAGE_KEYS.PERMISSION);
    if (!hasAsked && Notification.permission === 'default') {
      // Delay the request slightly to avoid immediate popup
      setTimeout(() => {
        requestPermission();
      }, 3000);
    }
  }, [requestPermission]);

  return {
    requestPermission,
    sendNotification,
    checkCartAbandonment,
    isSupported: 'Notification' in window,
    permission: 'Notification' in window ? Notification.permission : 'denied',
  };
};
