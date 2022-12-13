import React, { Fragment } from "react";
import Layout from "../../layout/Layout";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import Slider from "../../wrappers/slider/Slider";

const Home = () => {
  return (
    <Fragment>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <Slider />
        <FeatureIcon spaceBottomClass="pb-50" spaceTopClass="pt-50" />
      </Layout>
    </Fragment>
  );
};

export default Home;
