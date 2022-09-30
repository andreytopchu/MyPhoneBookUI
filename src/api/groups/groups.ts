import { get, post, remove } from '../baseRequest';

export class GroupsAPI {
  getGroups() {
    return get('Group/Get');
  }

  saveGroup(body: string) {
    return post('Group/Save', body);
  }

  deleteGroup(id: string) {
    return remove(`Group/Delete?groupId=${id}`);
  }
}
