import {loginInstance} from "../baseRequest";

export const users = {
  getUsers: async ({pageSize=6, page=1, search=""}: {pageSize: number, page: number, search: string}) => {
    if(!search) {
      return loginInstance.get(`/search/users?q=""&page=${page}&per_page=${pageSize}`)
    }
    else {
      return loginInstance.get(`/search/users?q=${search}&sort=users&page=${page}&per_page=${pageSize}`)
    }
  }
}
