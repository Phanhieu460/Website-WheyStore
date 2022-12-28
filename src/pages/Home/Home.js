import React, { Fragment } from "react";
import Layout from "../../layout/Layout";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import Slider from "../../wrappers/slider/Slider";
import Banner from "../../wrappers/banner/Banner";
import ProductSlider from "../../wrappers/product/ProductSlider";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

const Home = () => {
  return (
    <Fragment>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <Slider />
        {/* Feature Icon */}
        <FeatureIcon spaceBottomClass="pb-50" spaceTopClass="pt-50" />
        {/* Tab Product */}
        <TabProduct spaceBottomClass="pb-70" category="wheyprotein" />
        {/* Banner */}
        <Banner spaceBottomClass="pb-70" />
        {/* product slider */}
        <ProductSlider category="wheyprotein" />
        {/* blog */}
        <BlogFeatured spaceBottomClass="pb-55" spaceTopClass="pt-95" />
      </Layout>
    </Fragment>
  );
};

export default Home;
