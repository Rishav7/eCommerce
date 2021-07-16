import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom'

import Rating from "../components/Rating";

const Product = ({ product }) => {
  return (
      
    <Card className="my-3 p-3 rounded ">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'></Card.Img>
      </Link>

      <Card.Body>
        {/* variable syntax `statements` */}
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">{product.name}</Card.Title>
        </Link>

       

        <Card.Text>
            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>

        <Card.Text as="h2">
          <i className="fas fa-rupee-sign fa"></i>
          {product.price}
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
};

export default Product;
