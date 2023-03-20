import axios from 'axios';

const API_URL = `${window.location.origin}/api/contracts/oneflow`;
const token = localStorage.getItem('token');

class OneFlowAccountService {
  async getAllOneFlowAccounts() {
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

  async addOneFlowAccount(contract) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .post(API_URL + '/', contract, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async getOneFlowAccount(id) {
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

  async updateOneFlowAccount(account) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${account.id}`, account, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async deleteOneFlowAccount(id) {
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

export default new OneFlowAccountService();
