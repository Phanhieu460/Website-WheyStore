import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";

const MenuCart = ({ cartData, currency, deleteFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const discountedPrice = getDiscountPrice(
                single.entryPrice,
                single.discount
              );
              const finalProductPrice = (
                single.entryPrice * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link
                      to={process.env.PUBLIC_URL + "/product/" + single._id}
                    >
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + single.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + single._id}
                      >
                        {" "}
                        {single.name}{" "}
                      </Link>
                    </h4>
                    <h6>Số lượng: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency.currencySymbol +
                          Intl.NumberFormat("vi-VN").format(
                            finalDiscountedPrice
                          ) +
                          ".000"
                        : currency.currencySymbol +
                          Intl.NumberFormat("vi-VN").format(finalProductPrice) +
                          ".000"}
                    </span>
                    {/* {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Smell: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Tổng :{" "}
              <span className="shop-total">
                {currency.currencySymbol +
                  Intl.NumberFormat("vi-VN").format(cartTotalPrice.toFixed(2)) +
                  ".000"}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Giỏ hàng
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/login?redirect=shipping"}
            >
              Thanh toán
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Chưa có sản phẩm trong giỏ hàng!</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

export default MenuCart;
