import React from 'react';
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";

export default function StatCard({isNew}){
	return <Card className="card-stats">
    <Card.Body>
      <Row>
        <Col md="4" xs="5">
          <div className="icon-big text-center icon-warning">
            <i className="nc-icon nc-money-coins text-success" />
          </div>
        </Col>
        <Col md="8" xs="7">
          <div className="numbers">
            <p className="card-category">Revenue</p>
            <Card.Title tag="p">$ 1,345</Card.Title>
            <p />
          </div>
        </Col>
      </Row>
    </Card.Body>
    <Card.Footer>
      <hr />
      <div className="stats">
        <i className="far fa-calendar" /> Last day
      </div>
    </Card.Footer>
		</Card>
};
