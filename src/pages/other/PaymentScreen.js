import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import Layout from "../../layout/Layout";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cartData);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <div className="container d-flex justify-content-center align-items-center login-center">
          <form
            className="Login2 col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >
            <h4>Lựa Chọn Phương Thức Thanh Toán</h4>
            <div className="payment-container">
              <div className="radio-container">
                <input
                  className="form-check-input"
                  type="radio"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">
                  PayPal or Credit Card
                </label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label>Thanh toán khi nhận hàng</label>
              </div>
            </div>

            <button type="submit">Tiếp Tục</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default PaymentScreen;
