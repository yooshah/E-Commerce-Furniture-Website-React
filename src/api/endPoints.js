export const endPoints = {
  AUTH: {
    REGISTER: "/Auth/Register",
  },
  PRODUCT: {
    PRODUCT_BY_CATEGORY: (id) => `/Product/ViewProductByCategory/${id}`,
    SEARCH_PRODUCT: (word) => `/Product/SearchProducts?searchWord=${word}`,
    GET_PRODUCT_BY_ID: (id) => `/Product/GetProductById/${id}`,
    ADD_NEW_PRODUCT: "/Product/AddProduct",
    DELETE_PRODUCT: (id) => `Product/admin/DeleteProduct?id=${id}`,
    UPDATE_PRODUCT: (id) => `/Product/UpdateProduct/${id}`,
  },
  CART: {
    GET_USER_CART: "/Cart/User/ViewCart",
    ADD_TO_CART: (productId) => `/Cart/AddToCart/${productId}`,
    DELETE_CART_ITEM: (id) => `/Cart/DeleteCartItems/${id}`,
    INCREASE_QUANTITY: (id) => `/Cart/CartQuantity/${id}/increment`,
    DECREASE_QUANTITY: (id) => `/Cart/CartQuantity/${id}/decrement`,
  },
  WISHLIST: {
    ADD_TO_WISHLIST: (id) => `/WishList/AddToWishList?productId=${id}`,
    GET_USER_WISHLIST: "/WishList/viewWishListItems",
    REMOVE_ITEM: (id) => `/WishList/RemoveFromWishList?productId=${id}`,
  },
  DELIVERYADDRESS: {
    ADD_ADDRESS: "/Address/CreateOrderAddress",
    GET_ADDRESS: "/Address/GetDeliveryAddress",
    REMOVE_ADDRESS: (id) => `/Address/RemoveShippingAddress/${id}`,
  },

  ORDER: {
    RAZORPAY_ORDERID: (price) => `/Order/Razorpay/CreateOrderId/${price}`,
    RAZORPAY_PAYMENT: "/Order/Payment/Razorpay",
    PLACE_ORDER: "/Order/PlaceOrder",
    GET_USER_ORDERS: "/Order/UserOrderDetails",
    GET_USER_ORDER_BY_ADMIN: (id) => `/Order/AdminViewUserOrder?userId=${id}`,
    CHANGE_ORDER_STATUS: (orderId, orderStatus) =>
      `/Order/ChangeOrderStatus/${orderId}/statusChange?orderStatus=${orderStatus}`,
    TOTAL_REVENUE: "/Order/TotalRevenue",
    GET_REVENUE_RECORD: "/Order/Admin/RevenueRecord",
    GET_ORDER_LIST_BY_ID: (id) => `/Order/GetOrderItems?orderId=${id}`,
  },
  USER: {
    Get_All_USER: "/User/GetAllUserDetails",
    Block_AND_UNBLOCK: (id) =>
      `User/Admin/ChangeUserAccountStatus?userId=${id}`,
  },
};
