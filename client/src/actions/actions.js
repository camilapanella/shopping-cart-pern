import axios from "axios";

//constants - products
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

//constants - cart
export const ADD_TO_CART = "ADD_TO_CART";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const RESET_CART = "RESET_CART";

export const GET_SAVED_CARTS = "GET_SAVED_CARTS";
export const GET_SAVED_CART_ID = "GET_SAVED_CART_ID";
export const SAVE_CART = "SAVE_CART";
export const LOAD_CART = "LOAD_CART";
export const DELETE_CART = "DELETE_CART";

export function getProducts() {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/products`);
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}

export function getProductById(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/products/${id}`);
    return dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: json.data,
    });
  };
}
export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export const addToCart = (id) => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:3001/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      id: data[0].id,
      name: data[0].name,
      description: data[0].description,
      price: data[0].price,
      image: data[0].image,
      quantity: data[0].quantity,
    },
  });
};

export const increment = (payload) => {
  return {
    type: "INCREMENT",
    payload: payload,
  };
};

export const decrement = (payload) => {
  return {
    type: "DECREMENT",
    payload: payload,
  };
};

export const removeFromCart = (payload) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: payload,
  });
};

export function resetCart() {
  return {
    type: RESET_CART,
  };
}

export function getSavedCarts() {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/carts`);
    return dispatch({
      type: GET_SAVED_CARTS,
      payload: json.data,
    });
  };
}

export function getSavedCartId(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/carts/${id}`);
    return dispatch({
      type: GET_SAVED_CART_ID,
      payload: json.data,
    });
  };
}

export function saveCart(payload) {
  return async function (dispatch) {
    var json = await axios.post(`http://localhost:3001/carts`, payload);
    return dispatch({
      type: SAVE_CART,
      payload: json.data,
    });
  };
}

export function loadCart(payload) {
  return {
    type: "LOAD_CART",
    payload: payload,
  };
}

export function deleteCart(id) {
  return async function () {
    var json = await axios.delete(`http://localhost:3001/carts/${id}`);
  };
}