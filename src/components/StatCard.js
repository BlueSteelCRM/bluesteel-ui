import React from 'react';
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";

export default function StatCard({stat,title,subtitle}){
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
            <p className="card-category">{title}</p>
            <Card.Title>{stat}</Card.Title>
            <p />
          </div>
        </Col>
      </Row>
    </Card.Body>
		{subtitle?
    <Card.Footer>
      <hr />
      <div className="stats">{subtitle}</div>
    </Card.Footer>:""}
		</Card>
};
