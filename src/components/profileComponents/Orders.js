import moment from "moment";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const Orders = (props) => {
  const { loading, error, orders } = props;
  const history = useHistory();
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              Không Có Đơn Hàng
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                Bắt Đầu Mua Hàng
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Trạng Thái</th>
                    <th>Ngày</th>
                    <th>Tổng Cộng</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      <td>
                        <a
                          href="#"
                          onClick={() => {
                            history.push(`/order/${order._id}`);
                          }}
                          className="link"
                        >
                          {order._id}
                        </a>
                      </td>
                      <td>
                        {order.isPaid ? (
                          <>Đã Thanh Toán</>
                        ) : (
                          <>Chưa Thanh Toán</>
                        )}
                      </td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>
                        {Intl.NumberFormat("vi-VN").format(order.totalPrice) +
                          ".000"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
