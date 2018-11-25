import axios from 'axios';
import { addHours, subHours } from 'date-fns';

import mockStations from '../mock-stations.json';
import mockHistory from '../mock-history.json';
import config from '../config';

const httpClient = axios.create({
  baseURL: config.API_URL,
});

const api = {
  store: null,
  http: httpClient,
};

export const connectApiToStore = store => {
  api.store = store;
};

// Interceptors ==============================================================
api.http.interceptors.response.use(
  response => {
    if (__DEV__) {
      // console.log('> API response', response);
    }
    return response.data;
  },
  error => {
    const { response } = error;

    if (!response) {
      if (__DEV__) console.log('> Network error', response);
      return Promise.reject(error);
    }

    const { data } = response;

    if (__DEV__) console.log('> API response error', data);

    // Axios wraps errors returned by the api inside `response.data`
    return Promise.reject(error);
  }
);

// Exported API methods

// Trip ///////////////////////////////////////////////////////////////////////
/* eslint-disable */
export async function fetchHistory() {
  const res = await api.http.get('/history/1');
  console.log('> API fetchHistory', res);
  const h = res.history[res.history.length - 1];
  return h
    ? [
        {
          id: 4,
          date: subHours(new Date(), 1).toISOString(),
          duration: h.duration,
          ownersCut: h.owners_cut,
          totalCost: h.total_cost,
          chargingCost: h.charging_cost,
          parkingCost: h.parking_cost,
        },
        ...mockHistory,
      ]
    : mockHistory;
}
/* eslint-enable */

export async function fetchNearbyStations() {
  const stations = mockStations.map(s => ({
    ...s,
    endingTime: addHours(new Date(), 5),
  }));
  return stations;
}

export async function fetchReservationAuth() {
  const res = await api.http.get('/spot/status/auth/1');
  console.log('> API fetchReservationAuth', res);
  return res;
}

export async function fetchReservationStatus() {
  const res = await api.http.get('/spot/status/1');
  console.log('> API fetchReservationStatus', res);
  return res;
}

let percentage = 23;
export async function fetchCharging() {
  percentage += 1;
  return percentage >= 100
    ? { id: 1, percentage: 100, status: 'COMPLETE' }
    : { id: 1, percentage: Math.min(percentage, 100), status: 'CHARGING' };
}

export async function startCharging() {
  const res = await api.http.post('/spot/start/1');
  console.log('> API startCharging', res);
  return res;
}

export async function stopCharging() {
  const res = await api.http.post('/spot/stop/1');
  console.log('> API stopCharging', res);

  return {
    timestamp: Date.now(),
    chargingCost: res.charging_cost,
    parkingCost: res.parking_cost,
    totalCost: res.total_cost,
    duration: res.duration,
  };
}
