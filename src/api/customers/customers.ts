import { get, post, remove } from '../baseRequest';

export class CustomersAPI {
  getCustomers() {
    return get('User/GetUsers');
  }

  getCustomerById(id: string) {
    return get(`User/GetUserData?userId=${id}`);
  }

  saveCustomer(body: string) {
    return post('User/Save', body);
  }

  deleteCustomer(id: string) {
    return remove(`User/Delete?userId=${id}`);
  }
}
