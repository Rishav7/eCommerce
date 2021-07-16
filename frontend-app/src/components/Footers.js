import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footers = () => {
  return (
    <footer>
      <Container>
          <Row>
              <Col className = 'text-center py-3'>
                  Copyright &copy; eCommerce
              </Col>
          </Row>
      </Container>
    </footer>
  );
};

export default Footers;
