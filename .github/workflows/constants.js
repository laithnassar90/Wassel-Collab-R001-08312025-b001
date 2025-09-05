var APIRoot, ActionCableURL
if (process.env.NODE_ENV === 'development') {
  APIRoot = 'http://192.168.122.1:3000/api/'
  ActionCableURL = 'ws://192.168.122.1:3000/cable'
} else {
  APIRoot = 'https://blabla-clone-api.herokuapp.com/api/'
  ActionCableURL = 'wss://blabla-clone-api.herokuapp.com/cable'
}

export const APIEndpoints = {
  USERS:         APIRoot + 'users',
  CARS:          APIRoot + 'cars',
  NOTIFICATIONS: APIRoot + 'notifications',
  RIDES:         APIRoot + 'rides',
  RIDE_REQUESTS: APIRoot + 'ride_requests',
  SESSIONS:      APIRoot + 'sessions',
  LOGIN_EMAIL:   APIRoot + 'sessions/login',
  LOGIN_FB:      APIRoot + 'sessions/oath_login'
};

export const Permissions = {
  'USER': 'user',
  'ADMIN': 'admin',
  'PUBLIC': 'public'
};

export { APIRoot, ActionCableURL };