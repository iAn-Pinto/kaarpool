import { FeedbackInterface } from 'interfaces/feedback';
import { RideInterface } from 'interfaces/ride';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  ride_id: string;
  user_id: string;
  seat_count?: number;
  status: string;
  created_at?: any;
  updated_at?: any;
  feedback?: FeedbackInterface[];
  ride?: RideInterface;
  user?: UserInterface;
  _count?: {
    feedback?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  ride_id?: string;
  user_id?: string;
  status?: string;
}
