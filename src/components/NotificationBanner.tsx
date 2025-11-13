import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/use-notifications';
import { toast } from 'sonner';

export const NotificationBanner = () => {
  const [show, setShow] = useState(false);
  const { requestPermission, permission, isSupported, sendNotification } = useNotifications();

  useEffect(() => {
    if (!isSupported) return;
    if (permission !== 'default') return;
    if (localStorage.getItem('notification_banner_dismissed') === 'true') return;

    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, [isSupported, permission]);

  const handleEnable = async () => {
    try {
      const granted = await requestPermission();
      if (granted) {
        setShow(false);
        toast.success('Notifications enabled! You\'ll receive updates about deals and your cart.');
        
        // Send a test notification immediately
        setTimeout(() => {
          sendNotification(
            '🎉 Notifications Enabled!',
            'You\'ll now receive updates about daily deals, special offers, and cart reminders!'
          );
        }, 1000);
      } else {
        toast.error('Notification permission denied. Please enable it in your browser settings.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications. Please try again.');
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('notification_banner_dismissed', 'true');
  };

  if (!show || !isSupported || permission !== 'default') {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 px-4 max-w-2xl w-full">
      <div className="bg-primary text-primary-foreground px-6 py-4 rounded-full shadow-lg flex items-center gap-4">
        <Bell className="w-5 h-5 animate-pulse flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">Get notified about daily meal deals & special offers!</p>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleEnable}
          className="h-9 text-sm rounded-full px-6 font-semibold flex-shrink-0"
        >
          Enable
        </Button>
        <button
          onClick={handleDismiss}
          className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
