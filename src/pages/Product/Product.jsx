import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import styled from "styled-components";
import { Breadcrumb, Row, Col } from "antd";
import { mobile } from "../../responsive";
import "antd/dist/antd.css";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getProduct } from "../../features/Product/productSlice";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [listProduct, setListProduct] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
    // handleClickMenu()
  }, [dispatch]);

  useEffect(() => {
    if (!products) return;
    setListProduct(products.products);
  }, [products]);

  const menu = [
    { name: "Whey Protein", value: "wheyprotein" },
    { name: "Pre-Workout", value: "preworkout" },
    { name: "Sữa Tăng Cân", value: "weightgain" },
    { name: "Amino Axit, Creatin", value: "aminoaxit" },
    { name: "Vitamin Và Khoáng Chất", value: "vitamin" },
    { name: "Phụ Kiện", value: "accessory" },
  ];

  const handleClickMenu = (type) => {
    // dispatch(findProductByType(type))
    navigate(`/product?type=${type}`)
  }
  console.log(listProduct);
  return (
    <Helmet title={"Product"}>
      <Container>
        <Breadcrumb style={{padding: "0 100px"}}>
          <Breadcrumb.Item>
            <a href="">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="product">Sản phẩm</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Wrapper>
          <Left>
            <h2 style={{textAlign: "center"}}>Danh Mục</h2>
            <StyledMenu>

            {menu.map(item => {
              return  <li className="nav__item" key={item.value} >
              <div
                className={(navClass) =>
                  navClass.isActive ? "nav__active" : ""
                }
                onClick={() => handleClickMenu(item.value)}
              >
                {item.name}
              </div>
            </li>
            })}
            </StyledMenu>
          </Left>
          <Right>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              {listProduct?.map((item) => {
                return (
                  <StyledCol className="gutter-row" span={6}>
                    <ProductImage>
                      <Circle />
                      <Image src={item.image} />
                      <Info>
                        <Icon>
                          <ShoppingCartOutlined />
                        </Icon>
                        <Icon>
                          <SearchOutlined />
                        </Icon>
                        <Icon>
                          <FavoriteBorderOutlined />
                        </Icon>
                      </Info>
                    </ProductImage>
                    <ProductContent>
                      <p>
                        <a>{item.name}</a>
                      </p>
                      <span>{item.entryPrice}</span>
                    </ProductContent>
                  </StyledCol>
                );
              })}
            </Row>
          </Right>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default Product;

const Container = styled.div`
  padding: 20px 100px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 50px 100px;
  display: flex;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  width: 15%;
  border-right: 0.5px solid #e0dfdf;
`;

const Right = styled.div`
  width: 85%;
  padding: 0 20px;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.2); */
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const StyledCol = styled(Col)`
  padding: 10px;
  :hover {
    border: 1px solid #dddddd;
  }
`;
const ProductImage = styled.div`
  flex: 1;
  margin: 5px;
  aspect-ratio: auto 250 / 250;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const ProductContent = styled.div`
  flex: 1;
  margin: 5px;
  > span {
    color: red;
    font-weight: 700;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 50%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const StyledMenu = styled.ul`
  list-style: none;
  column-gap: 2.7rem;
  margin-bottom: 0;
  .nav__item {
    height: 30px;
  }
  .nav__item a {
    text-decoration: none;
    font-weight: 400;
    cursor: pointer;
  }
  .nav__active {
    font-weight: 800 !important;
  }
`;
