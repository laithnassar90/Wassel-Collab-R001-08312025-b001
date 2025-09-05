import {
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
} from '../constants/ActionTypes'
import { rideOptions, initialState } from './ride-options'

describe('reducers', () => {
  it('handles RIDE_OPTIONS_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,import { rideOptions, initialState } from './ride-options'; // Adjust path
describe('reducers', () => {
  it('handles RIDE_OPTIONS_FETCH_REQUEST', () => {
    const state = initialState; // Define state
    const action = { type: 'RIDE_OPTIONS_FETCH_REQUEST' };
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
    };
    expect(rideOptions(state, action)).toEqual(expected);
  });
  it('handles RIDE_OPTIONS_FETCH_SUCCESS', () => {
    const state = initialState; // Define state
    const action = { type: 'RIDE_OPTIONS_FETCH_SUCCESS', payload: {} };
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
    };
    expect(rideOptions(state, action)).toEqual(expected);
  });
});