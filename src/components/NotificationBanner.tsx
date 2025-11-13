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
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
      <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-3 max-w-md">
        <Bell className="w-5 h-5 animate-pulse" />
        <p className="text-sm font-medium">Get notified about daily meal deals & special offers!</p>
        <div className="flex items-center gap-2 ml-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleEnable}
            className="h-7 text-xs rounded-full"
          >
            Enable
          </Button>
          <button
            onClick={handleDismiss}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
