import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { login } from "../../redux/actions/userActions";

const Login = ({ location, history }) => {
  const { pathname } = location;
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>WheyHome | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang Chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng Nhập
      </BreadcrumbsItem>
      <Layout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 mx-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form onSubmit={submitHandler}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          type="password"
                          name="password"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="button-box">
                          <div className="login-toggle-btn">
                            <input type="checkbox" />
                            <label className="ml-10">
                              Nhớ thông tin đăng nhập
                            </label>
                            <Link to={process.env.PUBLIC_URL + "/"}>
                              Quên Mật Khẩu?
                            </Link>
                          </div>
                          <button type="submit">
                            <span>Đăng Nhập</span>
                          </button>
                          <br />
                          <p className="mt-10">
                            <Link
                              to={
                                redirect
                                  ? `/register?redirect=${redirect}`
                                  : "/register"
                              }
                            >
                              Bạn Chưa Có Tài Khoản ?{" "}
                              <strong>Đăng Ký Ngay</strong>
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
