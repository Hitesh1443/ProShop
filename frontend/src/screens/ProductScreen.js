/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = (props) => {
  const [product, setproduct] = useState({});
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`/api/products/${props.match.params.id}`);
      setproduct(res.data);
    };
    fetchdata();
  }, []);
  return (
    <React.Fragment>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                text={`${product.numReviews} Reviews`}
                value={product.rating}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock == 0}
                >
                  Add to Cart
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductScreen;
