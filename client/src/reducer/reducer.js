import {
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    CLEAR_DETAIL,
    ADD_TO_CART,
    INCREMENT,
    DECREMENT,
    REMOVE_FROM_CART,
    RESET_CART,
    GET_SAVED_CARTS,
    GET_SAVED_CART_ID,
    LOAD_CART,
  } from "../actions/actions";
  
  const initialState = {
    products: [],
    details: [],
    savedCarts: [],
    savedCartDetail: [],
    cart: [],
    total: 0,
    amount: 0,
  };
  
  export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
        };
      case GET_PRODUCT_BY_ID:
        return {
          ...state,
          details: action.payload,
        };
      case CLEAR_DETAIL:
        return {
          ...state,
          details: [],
        };
      case ADD_TO_CART:
        const item = action.payload;
        const existing = state.cart.find((e) => e.id === item.id);
  
        if (!existing) {
          return {
            ...state,
            cart: [...state.cart, item],
            total: state.total + item.price,
            amount: state.amount + 1,
          };
        }
      case INCREMENT:
        return {
          ...state,
          total: state.total + action.payload.price,
          cart: state.cart.map((e) => {
            if (e.id === action.payload.id) {
              e.quantity += 1;
            }
            return e;
          }),
        };
  
      case DECREMENT:
        return {
          ...state,
          total: state.total - action.payload.price,
          cart: state.cart.map((e) => {
            if (e.id === action.payload.id) {
              e.quantity -= 1;
            }
            return e;
          }),
        };
  
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter((e) => e.id !== action.payload.id),
          total: state.total - action.payload.price * action.payload.quantity,
          amount: state.amount - 1,
        };
  
      case RESET_CART:
        return {
          ...state,
          cart: [],
          total: 0,
          amount: 0,
        };
      case GET_SAVED_CARTS:
        return {
          ...state,
          savedCarts: action.payload,
        };
      case GET_SAVED_CART_ID:
        return {
          ...state,
          savedCartDetail: action.payload,
        };
  
      case LOAD_CART:
        return {
          ...state,
          cart: [...state.cart, action.payload],
          total: state.total + action.payload.price * action.payload.quantity,
          amount: state.amount + 1,
        };
      default:
        return { ...state };
    }
  };