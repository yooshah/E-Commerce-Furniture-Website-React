export const endPoints = {
  AUTH: {
    REGISTER: "/Auth/Register",
  },
  PRODUCT: {
    PRODUCT_BY_CATEGORY: (id) => `/Product/ViewProductByCategory/${id}`,
    SEARCH_PRODUCT: (word) => `/Product/SearchProducts?searchWord=${word}`,
    GET_PRODUCT_BY_ID: (id) => `/Product/GetProductById/${id}`,
  },
  CART: {
    GET_USER_CART: "/Cart/User/ViewCart",
    ADD_TO_CART: "/Cart/AddToCart",
    DELETE_CART_ITEM: (id) => `/Cart/DeleteCartItems/${id}`,
  },
};
