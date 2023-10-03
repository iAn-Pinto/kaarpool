interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Admin User', 'Passenger', 'Driver', 'Customer Support'],
  tenantName: 'Company',
  applicationName: 'KaarPool',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage own user information',
    'Book a ride',
    'Provide feedback on bookings',
    'View available rides',
  ],
  ownerAbilities: [
    'Manage users',
    'Manage companies',
    'Manage cars',
    'Manage rides',
    'Manage bookings',
    'Manage feedbacks',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/ad299e85-6077-416b-a07f-e512b39a95d1',
};
