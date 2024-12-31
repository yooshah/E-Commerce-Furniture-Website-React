export const endPoints = {
  AUTH: {
    REGISTER: "/Auth/Register",
  },
  PRODUCT: {
    PRODUCT_BY_CATEGORY: (id) => `/Product/ViewProductByCategory/${id}`,
    SEARCH_PRODUCT: (word) => `/Product/SearchProducts?searchWord=${word}`,
  },
  CART: {
    GET_USER_CART: "User/ViewCart",
  },
};
