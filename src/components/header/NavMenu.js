import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>Trang chủ</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}> Sản phẩm</Link>
          </li>
          {/* <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              Pages
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/cart"}>Giỏ hàng</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  Thanh toán
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  Tài Khoản
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>Về chúng tôi</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/contact"}>Liên hệ</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/not-found"}>404 Page</Link>
              </li>
            </ul>
          </li> */}
          <li>
            <Link to={process.env.PUBLIC_URL + "/blog"}>Blog</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>Liên hệ</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default NavMenu;
