import React, { Component } from "react";
import lodash from "lodash";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../services/customerService";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";

class Customers extends Component {
  state = {
    customers: [],
    searchQuery: "",
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter((c) => c._id != customer._id);
    this.setState({ customers });
    try {
      await deleteCustomer(customer._id);
      toast.success("Customer deleted Successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has been already deleted.");
      this.setState({ customers: originalCustomers });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      customers: allCustomers,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allCustomers;

    if (searchQuery) {
      filtered = allCustomers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = lodash.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { user } = this.props;
    const { currentPage, pageSize, searchQuery, sortColumn } = this.state;
    const { totalCount, data: customers } = this.getPagedData();
    console.log(customers);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            {user && (
              <Link
                to="/customers/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Customer
              </Link>
            )}
            <p>Showing {totalCount} in the database.</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <CustomersTable
              customers={customers}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
