import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    };
    fetchdata();
  }, []);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
export default HomeScreen;
