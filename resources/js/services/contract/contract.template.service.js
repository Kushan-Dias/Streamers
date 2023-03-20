import axios from 'axios';

const API_URL = `${window.location.origin}/api/contracts/templates`;
const token = localStorage.getItem('token');

class ContractTemplateService {
  async getAllContractTemplates(tenantId) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .get(API_URL + `/${tenantId}`, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async createContractTemplate(tenantId, contractTemplate) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .post(API_URL + `/${tenantId}/`, contractTemplate, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getContractTemplate(tenantId, id) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .get(API_URL + `/${tenantId}/${id}`, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async updateContractTemplate(tenantId, templateId, contractTemplate) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${tenantId}/${templateId}`, contractTemplate, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async deleteContractTemplate(tenantId, id) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .delete(API_URL + `/${tenantId}/${id}`, { headers: headers })
      .then(response => {
        return response.data;
      });
  }
}

export default new ContractTemplateService();
