import axios from 'axios';
import ApiClient from '../../utils/api.client';
import { REQUEST_METHOD } from "../../utils/enums";

const API_URL = `${window.location.origin}/api/tenants`;
const token = localStorage.getItem('token');

class TenantService {
  async getAllTenants() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await ApiClient.request(API_URL + '/', REQUEST_METHOD.GET, headers)
      .then(response => {
        return response.data;
      }).catch(error => {
        ApiClient.catchError(error).then(response => {
          return response.data;
        });
      });
  }

  async createTenant(tenant) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    tenant.domain = tenant.domain.toLowerCase();

    return axios
      .post(API_URL + '/', tenant, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getTenant(id) {
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

  async updateTenant(tenant) {
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

  async deleteTenant(id) {
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

export default new TenantService();
