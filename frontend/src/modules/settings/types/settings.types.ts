export interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide Icon
  href: string;
  isNew?: boolean;
}

export interface RecentActivity {
  id: string;
  title: string;
  description: string;
  user: string;
  date: string;
}

export interface BusinessProfile {
  businessName: string;
  legalName: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  gstNumber: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  description: string;
}
