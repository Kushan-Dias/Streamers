import axios from 'axios';

const API_URL = `${window.location.origin}/api/permissions`;
const token = localStorage.getItem('token');

class PermissionService {
  async getAllPermissions() {
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

  async createPermission(tenant) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .post(API_URL + '/', tenant, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getPermission(id) {
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

  async updatePermission(tenant) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${tenant.id}`, tenant, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async deletePermission(id) {
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

export default new PermissionService();
