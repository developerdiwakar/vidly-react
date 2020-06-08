import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCustomer, saveCustomer } from "../services/customerService";

class CustomerForm extends Form {
  state = {
    data: { name: "", phone: "", isGold: "" },
    options: { values: ["true", "false"], defaultChecked: "false" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(20).required().label("Name"),
    phone: Joi.string().min(5).max(12).required().label("Phone"),
    isGold: Joi.required().label("Is Gold"),
  };

  async componentDidMount() {
    this.populateCustomer();
  }

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
      this.setState({
        options: {
          values: ["true", "false"],
          defaultChecked: customer.isGold.toString(),
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold.toString(),
    };
  }

  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };

  render() {
    const { options } = this.state;
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderRadio("isGold", "Is Gold", options, "form-check")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
