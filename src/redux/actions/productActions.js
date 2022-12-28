import axios from "axios";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
export const fetchProducts = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data.products));
      })
      .catch((err) => console.log(err));
  };
};
