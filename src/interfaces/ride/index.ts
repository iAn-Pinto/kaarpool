import { BookingInterface } from 'interfaces/booking';
import { CarInterface } from 'interfaces/car';
import { GetQueryInterface } from 'interfaces';

export interface RideInterface {
  id?: string;
  start_location: string;
  end_location: string;
  start_time: any;
  end_time?: any;
  seats_available?: number;
  car_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  car?: CarInterface;
  _count?: {
    booking?: number;
  };
}

export interface RideGetQueryInterface extends GetQueryInterface {
  id?: string;
  start_location?: string;
  end_location?: string;
  car_id?: string;
}
