import { create } from "zustand";
import { toast } from "sonner";

export type NotificationCategory = 'Order' | 'Payment' | 'Kitchen' | 'Request' | 'Announcement' | 'Promotion';
export type NotificationPriority = 'High' | 'Medium' | 'Low' | 'Info';

export interface Notification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  time: string;
  read: boolean;
  timestamp: number;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  author: string;
  time: string;
  type: 'Info' | 'Warning';
}

interface NotificationState {
  notifications: Notification[];
  announcements: Announcement[];
  
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  addNotification: (notif: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
}

const mockNotifications: Notification[] = [
  { id: "N-1", title: "Urgent Order", description: "Order #ORD-1025 requires immediate attention Table T-07", category: "Order", priority: "High", time: "2 mins ago", read: false, timestamp: Date.now() - 120000 },
  { id: "N-2", title: "New Order Received", description: "New order #ORD-1026 has been placed Table T-08 • Dine In", category: "Order", priority: "High", time: "2 mins ago", read: false, timestamp: Date.now() - 130000 },
  { id: "N-3", title: "Payment Received", description: "Payment of ₹2,450 received for Invoice #INV-10023 Table T-05 • UPI", category: "Payment", priority: "Medium", time: "6 mins ago", read: false, timestamp: Date.now() - 360000 },
  { id: "N-4", title: "Urgent Kitchen Alert", description: "Order #ORD-1024 is delayed by 15 mins Table T-03 • Main Course", category: "Kitchen", priority: "High", time: "9 mins ago", read: false, timestamp: Date.now() - 540000 },
  { id: "N-5", title: "Customer Request", description: "Table T-06 requested for Water Table T-06", category: "Request", priority: "Low", time: "10 mins ago", read: false, timestamp: Date.now() - 600000 },
  { id: "N-6", title: "Payment Failed", description: "Payment of ₹1,250 failed for Invoice #INV-10024 Table T-12", category: "Payment", priority: "Medium", time: "10 mins ago", read: false, timestamp: Date.now() - 610000 },
  { id: "N-7", title: "Refund Requested", description: "Refund request for Invoice #INV-10020 Table T-11 • ₹560", category: "Payment", priority: "Medium", time: "14 mins ago", read: false, timestamp: Date.now() - 840000 },
  { id: "N-8", title: "Kitchen Announcement", description: "Kitchen will be closing at 11:30 PM today Kitchen", category: "Announcement", priority: "Info", time: "19 mins ago", read: false, timestamp: Date.now() - 1140000 },
  { id: "N-9", title: "Order Completed", description: "Order #ORD-1023 has been completed Table T-02", category: "Order", priority: "Low", time: "22 mins ago", read: true, timestamp: Date.now() - 1320000 },
];

const mockAnnouncements: Announcement[] = [
  { id: "A-1", title: "New Feature Released", description: "We've added Split Bill and Advance Booking features", author: "Admin", time: "5 hours ago", type: "Info" },
  { id: "A-2", title: "Holiday Notice", description: "Restaurant will be closed on 20 May 2025", author: "Admin", time: "1 day ago", type: "Warning" },
  { id: "A-3", title: "System Maintenance", description: "System maintenance on 15 May 2025 from 2:00 AM to 4:00 AM", author: "System", time: "1 hour ago", type: "Info" },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  announcements: mockAnnouncements,
  
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  
  clearAll: () => set({ notifications: [] }),
  
  addNotification: (notif) => {
    // Show toast popup whenever a notification is added
    if (notif.priority === 'High') {
      toast.error(notif.title, { description: notif.description });
    } else {
      toast.success(notif.title, { description: notif.description });
    }

    set((state) => {
      const newNotif: Notification = {
        ...notif,
        id: `N-${Math.floor(Math.random() * 10000)}`,
        read: false,
        timestamp: Date.now()
      };
      return { notifications: [newNotif, ...state.notifications] };
    });
  }
}));
