import PropTypes from "prop-types";
import React from "react";

const HeroSlider = ({ data, sliderClass }) => {
  return (
    <div
      className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${
        sliderClass ? sliderClass : ""
      }`}
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + data.image})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-medical slider-content-2 slider-content-2--white slider-animated-1">
              <h3 className="animated no-style">{data.title}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
              {/* <div className="slider-btn-medical btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + data.url}
                >
                  SHOP NOW
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string,
};

export default HeroSlider;
