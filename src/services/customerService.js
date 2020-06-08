import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/customers/";

function customerUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndPoint);
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
  // Update customer
  const body = { ...customer };
  body.isGold = body.isGold == "true" ? true : false;

  if (customer._id) {
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }
  // Insert customer
  return http.post(apiEndPoint, body);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
