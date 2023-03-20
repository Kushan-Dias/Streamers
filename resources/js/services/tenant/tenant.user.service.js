import axios from 'axios';

const API_URL = `${window.location.origin}/api/users`;
const token = localStorage.getItem('token');

class TenantUserService {
  async getAllUsers() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .get(API_URL + '/', { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async createUser(user) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .post(API_URL + '/create', user, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getUser(id) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .get(API_URL + `/${id}`, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async updateUser(user) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${user.id}`, user, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async deleteUser(id) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .delete(API_URL + `/${id}`, { headers: headers })
      .then(response => {
        return response.data;
      });
  }
}

export default new TenantUserService();
