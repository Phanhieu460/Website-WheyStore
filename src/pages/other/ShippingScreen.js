import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import Layout from "../../layout/Layout";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cartData);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [phone, setPhone] = useState(shippingAddress?.phone);
  const [country, setCountry] = useState(shippingAddress?.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phone, country }));
    history.push("/payment");
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
            className="Login col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >
            <h3>THÔNG TIN GIAO HÀNG</h3>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nhập tỉnh/thành phố"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            /> */}
            <button type="submit">Tiếp Tục</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ShippingScreen;
