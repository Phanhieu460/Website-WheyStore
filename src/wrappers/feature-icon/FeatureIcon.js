import PropTypes from "prop-types";
import React from "react";
import featureIconData from "../../data/feature-icon.json";
import FeatureIconSingle from "../../components/feature-icon/FeatureIconSingle.js";

const FeatureIcon = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div
      className={`support-area ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="support-wrap-4-border">
          <div className="row">
            {featureIconData &&
              featureIconData.map((single, key) => {
                return (
                  <FeatureIconSingle
                    data={single}
                    spaceBottomClass="mb-30"
                    textAlignClass="text-center"
                    key={key}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureIcon.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default FeatureIcon;
