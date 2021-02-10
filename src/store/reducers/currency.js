import {
  SELECT_RESTAURANT_LOADING,
  SELECT_RESTAURANT,
  SELECT_RESTAURANT_ERROR,
  FETCH_RESTAURANT_LOADING,
  FETCH_RESTAURANT,
  FETCH_RESTAURANT_ERROR,

  DELETE_RESTAURANT_LOADING,
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_ERROR,
} from '../actions/types';

import isEmpty from '../../validation/is-empty';
const initialState = {
  restaurant: {},
  restaurantList: [],
  isRestaurantSelected: false,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_RESTAURANT_LOADING:
      return {
        ...state,
        loading: true
      };
    case SELECT_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
        isRestaurantSelected: !isEmpty(action.payload),
        loading: false
      };
    case SELECT_RESTAURANT_ERROR:
      return {
        ...state,
        isRestaurantSelected: false,
        error: action.err,
        loading: false
      };


    case FETCH_RESTAURANT_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_RESTAURANT:
      return {
        ...state,
        restaurantList: action.payload,

        loading: false
      };
    case FETCH_RESTAURANT_ERROR:
      return {
        ...state,
        error: action.err,
        loading: false
      };

      case DELETE_RESTAURANT_LOADING :
        return {
          ...state,
          loading: true
        };
      case DELETE_RESTAURANT:
        if(state.isRestaurantSelected && state.restaurant.restaurent_id === action.payload.restaurent_id)
        {
          localStorage.removeItem('restaurant' );
          return {
            ...state,
            isRestaurantSelected: false,
            restaurant:{},
            restaurantList:  
             state.restaurantList.filter(item => item.restaurent_id !== action.payload.restaurent_id)
            }

        }
        return {
          ...state,
          restaurantList:  
           state.restaurantList.filter(item => item.restaurent_id !== action.payload.restaurent_id)
          }
        case DELETE_RESTAURANT_ERROR:
          return {
            ...state,
            error: action.err,
            loading: false
          };
    

    default:
      return state;
  }
}
