import axios from 'axios';

const API_URL = `${window.location.origin}/api/roles`;
const token = localStorage.getItem('token');

class RoleService {
  async getAllRoles() {
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

  async createRole(role) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .post(API_URL + '/', role, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getRole(id) {
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

  async updateRole(role) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${role.id}`, role, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async deleteRole(id) {
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

  async syncRolesPermissions(rolesPermissions) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .post(API_URL + '/sync', { "roles_permissions": rolesPermissions }, { headers: headers })
      .then(response => {
        return response.data;
      });
  }
}

export default new RoleService();
