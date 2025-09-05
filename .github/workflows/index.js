import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your reducers here
// For now, creating a basic structure
const rootReducer = combineReducers({
  routing: routerReducer,
  // Add other reducers as needed
});

export default rootReducer;