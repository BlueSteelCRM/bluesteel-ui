/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// react-bootstrap components
import {
  Alert,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";

class Notifications extends React.Component {
  state = {
    visible: true,
  };
  notificationAlert = React.createRef();
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Paper Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    this.notificationAlert.current.notificationAlert(options);
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title tag="h5">Notifications</Card.Title>
                  <p className="card-category">
                    Handcrafted by our colleague{" "}
                    <a
                      target="_blank"
                      href="https://www.instagram.com/manu.nazare/"
                    >
                      Nazare Emanuel-Ioan (Manu)
                    </a>
                    . Please checkout the{" "}
                    <a
                      href="https://github.com/creativetimofficial/react-notification-alert"
                      target="_blank"
                    >
                      full documentation.
                    </a>
                  </p>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="6">
                      <Card className="card-plain">
                        <Card.Header>
                          <Card.Title tag="h5">Notifications Style</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Alert color="info">
                            <span>This is a plain notification</span>
                          </Alert>
                          <Alert color="info" fade={false}>
                            <span>
                              This is a notification with close button.
                            </span>
                          </Alert>
                          <Alert
                            className="alert-with-icon"
                            color="info"
                            fade={false}
                          >
                            <span
                              data-notify="icon"
                              className="nc-icon nc-bell-55"
                            />
                            <span data-notify="message">
                              This is a notification with close button and icon.
                            </span>
                          </Alert>
                          <Alert
                            className="alert-with-icon"
                            color="info"
                            fade={false}
                          >
                            <span
                              data-notify="icon"
                              className="nc-icon nc-chart-pie-36"
                            />
                            <span data-notify="message">
                              This is a notification with close button and icon
                              and have many lines. You can see that the icon and
                              the close button are always vertically aligned.
                              This is a beautiful notification. So you don't
                              have to worry about the style.
                            </span>
                          </Alert>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="6">
                      <Card className="card-plain">
                        <Card.Header>
                          <Card.Title tag="h5">Notification states</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Alert color="primary" fade={false}>
                            <span>
                              <b>Primary - </b>
                              This is a regular notification made with
                              color="primary"
                            </span>
                          </Alert>
                          <Alert color="info" fade={false}>
                            <span>
                              <b>Info - </b>
                              This is a regular notification made with
                              color="info"
                            </span>
                          </Alert>
                          <Alert color="success" fade={false}>
                            <span>
                              <b>Success - </b>
                              This is a regular notification made with
                              color="success"
                            </span>
                          </Alert>
                          <Alert color="warning" fade={false}>
                            <span>
                              <b>Warning - </b>
                              This is a regular notification made with
                              color="warning"
                            </span>
                          </Alert>
                          <Alert color="danger" fade={false}>
                            <span>
                              <b>Danger - </b>
                              This is a regular notification made with
                              color="danger"
                            </span>
                          </Alert>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <Card.Body>
                  <div className="places-buttons">
                    <Row>
                      <Col className="ml-auto mr-auto text-center" md="6">
                        <Card.Title tag="h4">Notifications Places</Card.Title>
                        <p className="category">Click to view notifications</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" lg="8">
                        <Row>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tl")}
                            >
                              Top Left
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tc")}
                            >
                              Top Center
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tr")}
                            >
                              Top Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" lg="8">
                        <Row>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("bl")}
                            >
                              Bottom Left
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("bc")}
                            >
                              Bottom Center
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("br")}
                            >
                              Bottom Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Notifications;
