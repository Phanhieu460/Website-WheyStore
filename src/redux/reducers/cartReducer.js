import {
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

// const cartReducer = (
//   state = { cartItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;
//       const existItem = state.cartItems.find((x) => x.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//     case CART_REMOVE_ITEM:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };
//     case CART_SAVE_SHIPPING_ADDRESS:
//       return {
//         ...state,
//         shippingAddress: action.payload,
//       };
//     case CART_SAVE_PAYMENT_METHOD:
//       return {
//         ...state,
//         paymentMethod: action.payload,
//       };
//     case CART_CLEAR_ITEMS:
//       return {
//         ...state,
//         cartItems: [],
//       };
//     default:
//       return state;
//   }
// };

import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from "../actions/cartActions";

const initState = {
  cartItems: [],
  shippingAddress: {},
};

const cartReducer = (state = initState, action) => {
  const product = action.payload;

  if (action.type === ADD_TO_CART) {
    // for non variant products
    if (product.variation === undefined) {
      const cartItem = state.cartItems.filter(
        (item) => item.id === product._id
      )[0];
      if (cartItem === undefined) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuid(),
            },
          ],
        };
      } else {
        return state.cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              }
            : item
        );
      }
      // for variant products
    } else {
      const cartItem = state.cartItems?.filter(
        (item) =>
          item.id === product._id &&
          product.selectedProductColor &&
          product.selectedProductColor === item.selectedProductColor &&
          product.selectedProductSize &&
          product.selectedProductSize === item.selectedProductSize &&
          (product.cartItemId ? product.cartItemId === item.cartItemId : true)
      )[0];

      if (cartItem === undefined) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuid(),
            },
          ],
        };
      } else if (
        cartItem !== undefined &&
        (cartItem.selectedProductColor !== product.selectedProductColor ||
          cartItem.selectedProductSize !== product.selectedProductSize)
      ) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuid(),
            },
          ],
        };
      } else {
        return state.cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
              }
            : item
        );
      }
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(state.cartItems, product);
    } else {
      return state.cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      console.log(cartItems, "test");
    // cartItems.filter(

    //   (cartItem) => cartItem.cartItemId !== product.cartItemId
    // );
    return remainingItems(state.cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return state.cartItems.filter((item) => {
      return false;
    });
  }

  if (action.type === CART_SAVE_SHIPPING_ADDRESS) {
    return {
      ...state,
      shippingAddress: action.payload,
    };
  }
  if (action.type === CART_SAVE_PAYMENT_METHOD) {
    return {
      ...state,
      paymentMethod: action.payload,
    };
  }

  return state;
};

export default cartReducer;
