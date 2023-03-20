import axios from 'axios';

const API_URL = `${window.location.origin}/api/modules`;
const token = localStorage.getItem('token');

class ModuleService {
  async getAllModules() {
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

  async getTenantModules(id) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .get(API_URL + `/tenant/${id}`, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async addUpdateTenantModules(id, modules) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .post(API_URL + `/tenant/${id}`, modules, { headers: headers })
      .then(response => {
        return response.data;
      });
  }
}

export default new ModuleService();
