import { useNotification } from '@/context/NotificationContext';

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  }[notification.type];

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg`}>
      {notification.message}
    </div>
  );
}