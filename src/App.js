import PropTypes from "prop-types";
import React, { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import "./App.css";
import "./responsive.css";

// home pages

const Home = lazy(() => import("./pages/Home/Home"));

// // shop pages

const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);

// // product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// // blog pages

const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// // other pages
// const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/ProfileScreen"));
const Login = lazy(() => import("./pages/other/Login"));
const Register = lazy(() => import("./pages/other/Register"));
const Shipping = lazy(() => import("./pages/other/ShippingScreen"));
const Payment = lazy(() => import("./pages/other/PaymentScreen"));
const PlaceOrder = lazy(() => import("./pages/other/PlaceOrderScreen"));
const OrderScreen = lazy(() => import("./pages/other/OrderScreen"));

const Cart = lazy(() => import("./pages/other/Cart"));
// const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

// const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Home}
                />

                {/* Homepages */}

                <Route
                  path={process.env.PUBLIC_URL + "/home-medical-equipment"}
                  component={Home}
                />

                {/* Shop pages */}

                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={ShopGridRightSidebar}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                {/* Blog pages */}

                <Route
                  path={process.env.PUBLIC_URL + "/blog"}
                  component={BlogNoSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-details"}
                  component={BlogDetailsStandard}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  component={Login}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Register}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/profile"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shipping"}
                  component={Shipping}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/payment"}
                  component={Payment}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/placeorder"}
                  component={PlaceOrder}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/order/:id"}
                  component={OrderScreen}
                />
                {/* <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                

                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
               

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} /> */}
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(App);
