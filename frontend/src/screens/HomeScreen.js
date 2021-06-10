import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../store/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col
              className="d-flex align-self-stretch"
              key={product._id}
              sm={12}
              md={6}
              lg={4}
            >
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
};
export default HomeScreen;
