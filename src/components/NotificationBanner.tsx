import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/use-notifications';

export const NotificationBanner = () => {
  const [show, setShow] = useState(false);
  const { requestPermission, permission, isSupported } = useNotifications();

  useEffect(() => {
    // Show banner if notifications are supported and permission is not granted
    if (isSupported && permission === 'default') {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSupported, permission]);

  const handleEnable = async () => {
    const granted = await requestPermission();
    if (granted) {
      setShow(false);
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
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 px-4 max-w-md w-full">
      <div className="bg-primary text-primary-foreground px-4 sm:px-6 py-3 rounded-2xl shadow-lg">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 animate-pulse flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-snug">Get notified about daily meal deals & special offers!</p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleEnable}
            className="h-8 text-xs rounded-full px-4"
          >
            Enable Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};
