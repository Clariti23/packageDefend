import { withRouter, Link } from "react-router-dom";
import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import "./style.css";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: null,
      nameOnPack: null,
      eta: null,
      meeting: null,
      formErrors: {
        sender: "",
        nameOnPack: "",
        eta: "",
        meeting: ""
      }
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "Sender":
        formErrors.f_name =
          value.length < 1
            ? "A sender is required (e.g. Amazon, Person's Name)"
            : "";
        break;
      case "nameOnPack":
        formErrors.nameOnPack =
          value.length < 1 ? "Name on Package is required" : "";
        break;
      case "eta":
        formErrors.eta =
          value.length < 1 ? "A delivery estimate is required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      let newOrder = {
        sender: this.state.sender,
        nameOnPack: this.state.nameOnPack,
        eta: this.state.eta,
        meeting: this.state.meeting
      };

      const configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newOrder)
      };

      fetch("http://localhost:3000/api/orders/new", configObject).then(
        response =>
          response.json().then(data => {
            console.log(data);
            data.status === 200
              ? this.props.history.push("/new_order_submit")
              : this.props.history.push("/new_order_error");
          })
      );
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  render() {
    console.log(this.props);
    const { formErrors } = this.state;

    return (
      <React.Fragment>
        <Link to="/find">Return to Map</Link>
        <br></br>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
          <h2>Ask [INTERPOLATE NAME] To Defend Your Package!</h2>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className={
                  formErrors.sender.length > 0
                    ? "signup-create-errorBorder"
                    : null
                }
                isInvalid={formErrors.sender}
                name="sender"
                type="text"
                placeholder="Sender (e.g. Amazon, person's name)"
                onChange={this.handleChange}
              />
              {formErrors.sender.length > 0 && (
                <span className="signup-create-errorMessage">
                  {formErrors.sender}
                </span>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Name on Package</Form.Label>
              <Form.Control
                name="nameOnPack"
                type="text"
                placeholder="Name on Package"
                onChange={this.handleChange}
              />
              {formErrors.nameOnPack.length > 0 && (
                <span className="signup-create-errorMessage">
                  {formErrors.nameOnPack}
                </span>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Est. Delivery</Form.Label>
              <Form.Control
                name="eta"
                type="date"
                placeholder="DD/MM/YYYY"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="signup-create-errorMessage">
                  {formErrors.eta}
                </span>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Est. Meeting</Form.Label>
            <Form.Control
              name="meeting"
              type="date"
              placeholder="DD/MM/YYYY"
              onChange={this.handleChange}
            />
            {formErrors.address.length > 0 && (
              <span className="signup-create-errorMessage">
                {formErrors.meeting}
              </span>
            )}
          </Form.Group>
          <Button bg="dark" variant="dark" type="submit">
            Defend my package!
          </Button>
        </Form>
        <br></br>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}

export default withRouter(OrderForm);