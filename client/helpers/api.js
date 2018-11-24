import axios from 'axios';
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
    if (__DEV__) console.log('> API response', response);
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

// Add jwt token to requests
api.http.interceptors.request.use(
  async requestConfig => {
    // const credentials = await getPersistedCredentials();

    const reqConfig = {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        // Authorization: `Bearer ${credentials.accessToken}`,
      },
    };

    if (__DEV__) console.log('> API request', reqConfig);

    return reqConfig;
  },
  error => {
    if (__DEV__) console.log('> API request error', error);
    return Promise.reject(error);
  }
);

// Exported API methods

// Trip ///////////////////////////////////////////////////////////////////////
export async function fetchNearbyStations({ latitude, longitude }) {
  return api.http.get(
    `/nearby_stations?latitude=${latitude}&longitude=${longitude}`
  );
}

export async function fetchReservation() {
  return { id: 1, status: 'CHARGING' };
  // return api.http.get(
  //   `/nearby_stations?latitude=${latitude}&longitude=${longitude}`
  // );
}

let percentage = 0;
export async function fetchCharging() {
  percentage += 1;
  return percentage >= 100
    ? { id: 1, percentage: 100, status: 'COMPLETE' }
    : { id: 1, percentage: Math.min(percentage, 100), status: 'CHARGING' };
  // return api.http.get(
  //   `/nearby_stations?latitude=${latitude}&longitude=${longitude}`
  // );
}

export async function stopCharging() {
  return {
    timestamp: Date.now(),
    address: 'Puumiehenkuja 3',
    total: 2045, // cents
    chargeTime: 1200000, // ms -> 20 mins
  };
  // return api.http.post(
  //   `/nearby_stations?latitude=${latitude}&longitude=${longitude}`
  // );
}
