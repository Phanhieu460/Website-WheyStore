import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import styled from "styled-components";
import { Breadcrumb, Row, Col } from "antd";
import { mobile } from "../../responsive";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlog } from "../../features/Blog/blogSlice";


const Blog = () => {
  const [listBlog, setListBlog] = useState([]);

  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlog());

  }, [dispatch]);

  useEffect(() => {
    if (!blogs) return;
    setListBlog(blogs.blogs);
  }, [blogs]);


  return (
    <Helmet title={"Blog"}>
      <Container>
        <Breadcrumb style={{padding: "0 100px"}}>
          <Breadcrumb.Item>
            <a href="">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="blog">Kiến Thức</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Wrapper>
          
          <Right>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              {listBlog?.map((item) => {
                return (
                  <StyledCol className="gutter-row" span={12}>
                    <ProductImage>
                      <Circle />
                      <Image src={item.image} />
                    </ProductImage>
                    <ProductContent>
                      <p>
                        {item.name}
                      </p>
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

export default Blog;

const Container = styled.div`
  padding: 20px 100px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px 100px;
  display: flex;
  ${mobile({ padding: "10px" })}
`;

const Right = styled.div`
  width: 85%;
  padding: 0 20px;
`;

const StyledCol = styled(Col)`
  padding: 10px;
  
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
`;

const ProductContent = styled.div`
  flex: 1;
  margin: 5px;
  > p {
    font-size: 18px;
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
  height: 100%;
  z-index: 2;
`;
