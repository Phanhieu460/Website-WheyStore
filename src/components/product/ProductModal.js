import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect } from "react-redux";

function ProductModal(props) {
  const { product } = props;
  const { currency } = props;
  const { discountedprice } = props;
  const { finalproductprice } = props;
  const { finaldiscountedprice } = props;

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [selectedProductColor] = useState(
    product.variation.length > 0 ? product?.variation[0]?.smell : ""
  );
  const [selectedProductSize] = useState(
    product.variation.length > 0 ? product?.variation[0]?.size[0]?.name : ""
  );
  const [productStock] = useState(
    product.variation.length > 0
      ? product.variation[0]?.size[0]?.stock
      : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const addToCart = props.addtocart;

  const addToast = props.addtoast;
  const cartItems = props.cartitems;

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.image &&
                    product.image.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.PUBLIC_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.image &&
                    product.image.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.PUBLIC_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {discountedprice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol +
                          Intl.NumberFormat("vi-VN").format(
                            finaldiscountedprice
                          ) +
                          ".000"}
                      </span>{" "}
                      <span className="old">
                        {currency.currencySymbol +
                          Intl.NumberFormat("vi-VN").format(finalproductprice) +
                          ".000"}
                      </span>
                    </Fragment>
                  ) : (
                    <span>
                      {currency.currencySymbol +
                        Intl.NumberFormat("vi-VN").format(finalproductprice) +
                        ".000"}{" "}
                    </span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="pro-details-list">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  ></p>
                </div>

                {/* {product.variation ? (
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <span>Flavor</span>
                      <div className="pro-details-color-content">
                        {product.variation.map((single, key) => {
                          return (
                            <labe
                              className={`pro-details-color-content--single`}
                              key={key}
                            >
                              <input
                                type="text"
                                value={single.smell}
                                name="product-color"
                                onChange={() => {
                                  setSelectedProductColor(single.smell);
                                  setSelectedProductSize(single.size[0].name);
                                  setProductStock(single.size[0].stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="size-name">{single.smell}</span>
                            </labe>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      <span>Tripping</span>
                      <div className="pro-details-size-content">
                        {product.variation &&
                          product.variation.map((single) => {
                            return single.smell === selectedProductColor
                              ? single.size.map((singleSize, key) => {
                                  return (
                                    <label
                                      className={`pro-details-size-content--single`}
                                      key={key}
                                    >
                                      <input
                                        type="text"
                                        value={singleSize.name}
                                        checked={
                                          singleSize.name ===
                                          selectedProductSize
                                            ? "checked"
                                            : ""
                                        }
                                        onChange={() => {
                                          setSelectedProductSize(
                                            singleSize.name
                                          );
                                          setProductStock(singleSize.stock);
                                          setQuantityCount(1);
                                        }}
                                      />
                                      <span className="size-name">
                                        {singleSize.name}
                                      </span>
                                    </label>
                                  );
                                })
                              : "";
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
                {product.affiliateLink ? (
                  <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover">
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Mua Ngay
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1 ? quantityCount - 1 : 1
                          )
                        }
                        className="dec qtybutton"
                      >
                        -
                      </button>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        value={quantityCount}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount < productStock - productCartQty
                              ? quantityCount + 1
                              : quantityCount
                          )
                        }
                        className="inc qtybutton"
                      >
                        +
                      </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      {productStock && productStock > 0 ? (
                        <button
                          onClick={() =>
                            addToCart(
                              product,
                              addToast,
                              quantityCount,
                              selectedProductColor,
                              selectedProductSize
                            )
                          }
                          disabled={productCartQty >= productStock}
                        >
                          {" "}
                          Thêm Vào Giỏ Hàng{" "}
                        </button>
                      ) : (
                        <button disabled>Hết Hàng</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartitems: state.cartData.cartItems,
  };
};

export default connect(mapStateToProps)(ProductModal);
