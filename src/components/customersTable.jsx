import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Table from "./common/table";

class CustomersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Is Gold",
      content: (customer) =>
        customer.isGold ? (
          <span className="badge badge-success">YES</span>
        ) : (
          <span className="badge badge-danger">NO</span>
        ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => this.props.onDelete(customer)}
        className="btn btn-danger btn-sm"
      >
        <i className="fa fa-trash"></i>
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.currentUser;
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { customers, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={customers}
      />
    );
  }
}

export default CustomersTable;
