import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications } from '@/hooks/use-notifications';

export const NotificationSettings = () => {
  const { permission, isSupported, requestPermission } = useNotifications();

  if (!isSupported) {
    return null;
  }

  const handleToggle = async () => {
    if (permission === 'granted') {
      // Can't programmatically revoke, show instructions
      alert('To disable notifications, please use your browser settings:\n\n1. Click the lock icon in the address bar\n2. Find Notifications\n3. Block or remove permission');
    } else if (permission === 'default' || permission === 'denied') {
      await requestPermission();
    }
  };

  const isEnabled = permission === 'granted';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 h-10"
        >
          {isEnabled ? (
            <Bell className="w-4 h-4" />
          ) : (
            <BellOff className="w-4 h-4" />
          )}
          <span>Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-1">Push Notifications</h3>
            <p className="text-xs text-muted-foreground">
              Get notified about meal times, deals, and cart reminders
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEnabled ? (
                <>
                  <Bell className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Enabled</span>
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Disabled</span>
                </>
              )}
            </div>
            <Button
              size="sm"
              variant={isEnabled ? "outline" : "default"}
              onClick={handleToggle}
              className="h-8"
            >
              {isEnabled ? 'Manage' : 'Enable'}
            </Button>
          </div>

          {isEnabled && (
            <div className="text-xs text-muted-foreground border-t pt-3">
              <p className="font-medium mb-1">You'll receive notifications for:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-1">
                <li>Lunch specials (12:30 PM)</li>
                <li>Evening snacks (5:00 PM)</li>
                <li>Dinner deals (8:30 PM)</li>
                <li>Cart reminders (after 5 min)</li>
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
