import { get, post, remove } from '../baseRequest';

export class CategoriesAPI {
  getCategories() {
    return get('PhoneCategory/Get');
  }

  saveCategories(body: string) {
    return post('PhoneCategory/Save', body);
  }

  deleteCategories(id: string) {
    return remove(`PhoneCategory/Delete?categoryId=${id}`);
  }
}
