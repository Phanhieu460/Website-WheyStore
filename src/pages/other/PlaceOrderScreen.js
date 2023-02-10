import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";
import Message from "../../components/LoadingError/Error";
import Layout from "../../layout/Layout";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartData);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems?.reduce(
      (acc, item) => acc + item.entryPrice * item.quantity,
      0
    )
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <div className="container">
          <div className="row  order-detail">
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row ">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i class="fas fa-user"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Khách Hàng</strong>
                  </h5>
                  <p>{userInfo?.name}</p>
                  <p>{userInfo?.email}</p>
                  <p>Số điện thoại: {cart.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-truck-moving"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Phương Thức Thanh Toán</strong>
                  </h5>

                  <p>
                    Phương Thức Thanh Toán:{" "}
                    {cart.paymentMethod === "paypal"
                      ? "Paypal"
                      : "Thanh Toán Khi Nhận Hàng"}
                  </p>
                </div>
              </div>
            </div>
            {/* 3 */}
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Địa Chỉ Giao Hàng</strong>
                  </h5>
                  <p>
                    {cart.shippingAddress.city}, {cart.shippingAddress.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {cartItems?.length === 0 ? (
                <Message variant="alert-info mt-5">
                  Giỏ hàng của bạn trống!
                </Message>
              ) : (
                <>
                  {cartItems?.map((item, index) => (
                    <div className="order-product row" key={index}>
                      <div className="col-md-3 col-6">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                          <h6>{item.name}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4>Số Lượng</h4>
                        <h6>{item.quantity}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>Đơn Giá</h4>
                        <h6>
                          {Intl.NumberFormat("vi-VN").format(
                            item.quantity * item.entryPrice
                          ) + ".000"}
                        </h6>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* total */}
            <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Sản Phẩm</strong>
                    </td>
                    <td>
                      {Intl.NumberFormat("vi-VN").format(cart.itemsPrice) +
                        ".000"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Shipping</strong>
                    </td>
                    <td>
                      {Intl.NumberFormat("vi-VN").format(cart.shippingPrice) +
                        ".000"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tax</strong>
                    </td>
                    <td>
                      {Intl.NumberFormat("vi-VN").format(cart.taxPrice) +
                        ".000"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tổng</strong>
                    </td>
                    <td>
                      {Intl.NumberFormat("vi-VN").format(cart.totalPrice) +
                        ".000"}
                    </td>
                  </tr>
                </tbody>
              </table>
              {cartItems.length === 0 ? null : (
                <button type="submit" onClick={placeOrderHandler}>
                  Đặt Hàng
                </button>
              )}
              {error && (
                <div className="my-3 col-12">
                  <Message variant="alert-danger">{error}</Message>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PlaceOrderScreen;
