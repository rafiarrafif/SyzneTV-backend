export interface JWTAuthToken {
  id: string;
  isAuthenticated: boolean;
  validUntil: Date;
  user: User;
  iat: number;
  exp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  birthDate: null;
  bioProfile: null;
  preference: Preference;
}

interface Preference {
  id: string;
  userId: string;
  langPreference: null;
  adultFiltering: string;
  adultAlert: string;
  videoQuality: string;
  serviceDefaultId: null;
  hideContries: any[];
}
