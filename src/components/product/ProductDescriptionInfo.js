import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  addToast,
  addToCart,
}) => {
  const [selectedProductColor] = useState(
    product.variation.length > 0 ? product?.variation[0]?.smell : ""
  );
  const [selectedProductSize] = useState(
    product.variation.length > 0 ? product?.variation[0]?.size[0]?.name : ""
  );
  const [productStock] = useState(
    product.variation.length > 0
      ? product?.variation[0]?.size[0]?.stock
      : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>
              {"₫" +
                " " +
                Intl.NumberFormat("vi-VN").format(finalDiscountedPrice) +
                ".000"}
            </span>{" "}
            <span className="old">
              {"₫" +
                " " +
                Intl.NumberFormat("vi-VN").format(finalProductPrice) +
                ".000"}
            </span>
          </Fragment>
        ) : (
          <span>
            {"₫" +
              " " +
              Intl.NumberFormat("vi-VN").format(finalProductPrice) +
              ".000"}{" "}
          </span>
        )}
      </div>

      <div
        className="pro-details-list"
        dangerouslySetInnerHTML={{ __html: product.shortDescription }}
      ></div>

      {/* {product.variation.length > 0 ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <div className="pro-details-color-content">
              <span>Flavor</span>
              {product.variation.map((single, key) => {
                return (
                  <>
                    <label
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
                    </label>
                  </>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <div className="pro-details-size-content">
              <span>Tripping</span>
              {product.variation.length > 0 &&
                product.variation.map((single) => {
                  return single.smell === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <>
                            <label
                              className={`pro-details-size-content--single`}
                              key={key}
                            >
                              <input
                                type="text"
                                value={singleSize.name}
                                checked={
                                  singleSize.name === selectedProductSize
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductSize(singleSize.name);
                                  setProductStock(singleSize.stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="size-name">
                                {singleSize.name}
                              </span>
                            </label>
                          </>
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
          <div className="pro-details-cart btn-hover ml-0">
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
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
          {/* <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => addToWishlist(product, addToast)}
            >
              <i className="pe-7s-like" />
            </button>
          </div> */}
          {/* <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => addToCompare(product, addToast)}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div> */}
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Loại Sản Phẩm :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
