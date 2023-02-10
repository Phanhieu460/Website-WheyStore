import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams }) => {
  const render = (keyName) => {
    switch (keyName) {
      case "wheyprotein":
        return "Whey Protein";
      case "preworkout":
        return "Pre-Workout";
      case "weightgain":
        return "Tăng Cân";
      case "aminoaxit":
        return "Amino Axit, Creatin";
      case "vitamin":
        return "Vitamin Và Khoáng Chất";
      case "accessory":
        return "Phụ Kiện";
      default:
        break;
    }
  };
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Loại sản phẩm </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Tất cả
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {render(category)}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
