import axios from 'axios';

const API_URL = `${window.location.origin}/api/contracts`;
const token = localStorage.getItem('token');

class ContractService {
  async getAllContracts() {
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

  async createContract(contract) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    contract.domain = contract.domain.toLowerCase();

    return axios
      .post(API_URL + '/', contract, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getContract(id) {
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

  async updateContract(contract) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${contract.id}`, contract, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async deleteContract(id) {
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

export default new ContractService();
