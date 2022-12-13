import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { MailOutline, Phone, Room } from "@material-ui/icons";
import GoogleMapReact from "google-map-react";
import Helmet from "../../components/Helmet/Helmet";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
  const form = Form.useForm();

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const onFinish = () => {
    console.log("Contact");
  };

  const defaultProps = {
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    zoom: 8,
  };
  return (
    <Helmet title={"Home"}>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="home">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="contact">Liên hệ</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Wrapper>
          <Left>
            <h2>Để Lại Tin Nhắn</h2>
            <p>
              Tư vấn và cung cấp những sản phẩm THỰC PHẨM BỔ SUNG DINH DƯỠNG THỂ
              THAO của những thương hiệu UY TÍN CHẤT LƯỢNG hàng đầu thế giới
              được chọn lọc kĩ càng với đến với người tiêu dùng Việt Nam.
            </p>
            <div>
              <ContactItem>
                <Icon>
                  <Room />
                </Icon>
                17 Xuân Thủy, Cầu Giấy, Hà Nội
              </ContactItem>
              <ContactItem>
                <Icon>
                  <Phone />
                </Icon>
                +84 981 04 24 60
              </ContactItem>
              <ContactItem>
                <Icon>
                  <MailOutline />
                </Icon>
                phanbahieu460@gmail.com
              </ContactItem>
            </div>
          </Left>
          <Right>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Họ và tên"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống.",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống.",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống.",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Nội dung"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống.",
                  },
                ]}
              >
                <Input.TextArea
                  type="text"
                  placeholder="Nhập nội dung"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" danger htmlType="submit">
                  GỬI TIN NHẮN
                </Button>
              </Form.Item>
            </Form>
          </Right>
        </Wrapper>
        <div style={{ height: "80vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={-34.397} lng={150.644} text="My Marker" />
          </GoogleMapReact>
        </div>
      </Container>
    </Helmet>
  );
};

export default Contact;

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
  width: 30%;
`;
const Right = styled.div`
  width: 70%;
`;

const ContactItem = styled.div`
  padding: 5px 0 5px 60px;
  min-height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;
const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  text-align: center;
  border: 1px dashed red;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  color: red;
  line-height: 50px !important;
  transform: translate(0, -50%);
`;
