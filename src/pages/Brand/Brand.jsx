import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import styled from "styled-components";
import { Col, Row, Breadcrumb } from "antd";
import { mobile } from "../../responsive";
import logo from "../../assets/logo.png";

const Brand = () => {
  const data = [
    {
      id: 1,
      image:
        "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/allmax.jpg",
    },
    {
      id: 2,
      image:
        "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/bsn.jpg",
    },
    {
      id: 3,
      image:
        "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/blackmores-2.jpg",
    },
    {
      id: 4,
      image:
        "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/bpi-sport.jpg",
    },
    {
      id: 5,
      image:
        "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/biotech.jpg",
    },
    {
        id: 6,
        image: "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2021/03/070fada7b5ee47b01eff.jpg"
    },
    {
        id: 7,
        image: "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/cellucor.jpg"
    },
    {
        id: 8,
        image: "https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/dymatize.jpg"
    }
  ];
  return (
    <Helmet title={"Brand"}>
         <Row span={24}>
            <Col span={24}>
              <img style={{height: "auto", maxWidth: "100%"}} src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2020/06/top-thuong-hieu-ban-chay-so-1-the-gioi-san-pham-chinh-hang-gia-re-ha-noi-tphcm2-1-scaled.jpg" />
            </Col>
          </Row>
      <Container>
        <Breadcrumb style={{ padding: "0 100px" }}>
          <Breadcrumb.Item>
            <a href="">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="brand">Thương hiệu</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Wrapper>
         
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            {data.map((item) => {
              return (
                <StyledCol span={6}>
                  <ProductImage>
                    <Image src={item.image} />
                  </ProductImage>
                </StyledCol>
              );
            })}
          </Row>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default Brand;

const Container = styled.div`
  padding: 20px 150px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 30px 200px;
  display: flex;
  ${mobile({ padding: "10px" })}
`;

const StyledCol = styled(Col)`
  padding: 5px;
  
`;
const ProductImage = styled.div`
  flex: 1;
 width: 250px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border: 1px solid #dddddd;
`;
const Image = styled.img`
  height: 50%;
  z-index: 2;
`;
