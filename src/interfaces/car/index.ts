import { RideInterface } from 'interfaces/ride';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  license_plate?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  ride?: RideInterface[];
  user?: UserInterface;
  _count?: {
    ride?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  color?: string;
  license_plate?: string;
  user_id?: string;
}
