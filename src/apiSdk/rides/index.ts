import queryString from 'query-string';
import { RideInterface, RideGetQueryInterface } from 'interfaces/ride';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRides = async (query?: RideGetQueryInterface): Promise<PaginatedInterface<RideInterface>> => {
  return fetcher('/api/rides', {}, query);
};

export const createRide = async (ride: RideInterface) => {
  return fetcher('/api/rides', { method: 'POST', body: JSON.stringify(ride) });
};

export const updateRideById = async (id: string, ride: RideInterface) => {
  return fetcher(`/api/rides/${id}`, { method: 'PUT', body: JSON.stringify(ride) });
};

export const getRideById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/rides/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteRideById = async (id: string) => {
  return fetcher(`/api/rides/${id}`, { method: 'DELETE' });
};
