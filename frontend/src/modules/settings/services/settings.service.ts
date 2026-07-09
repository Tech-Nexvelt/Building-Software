import { RecentActivity, BusinessProfile } from '../types/settings.types';

const MOCK_ACTIVITY: RecentActivity[] = [
  {
    id: '1',
    title: 'Profile Updated',
    description: 'Business profile information was updated',
    user: 'Kishore Yadav',
    date: '24 May 2026, 09:45 AM'
  },
  {
    id: '2',
    title: 'Printer Added',
    description: 'New receipt printer connected',
    user: 'Sneha Iyer',
    date: '24 May 2026, 09:20 AM'
  },
  {
    id: '3',
    title: 'Tax Settings Updated',
    description: 'GST and tax configuration updated',
    user: 'Kishore Yadav',
    date: '24 May 2026, 09:15 AM'
  },
  {
    id: '4',
    title: 'User Added',
    description: 'New user Rahul Sharma added',
    user: 'Kishore Yadav',
    date: '24 May 2026, 08:30 AM'
  }
];

export const settingsService = {
  async getRecentActivity(): Promise<RecentActivity[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_ACTIVITY;
  }
};
