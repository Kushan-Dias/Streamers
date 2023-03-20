import axios from 'axios';

const API_URL = `${window.location.origin}/api/events`;
const token = localStorage.getItem('token');

class EventService {
  async getCalendarEvents() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .get(API_URL + '/calendar', { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  async createEvent(event) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return await axios
      .post(API_URL + '/', event, { headers: headers })
      .then(response => {
        return response.data;
      }).catch((error) => {
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

  async updateTenant(event) {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return axios
      .put(API_URL + `/${event.id}`, event, { headers: headers })
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

export default new EventService();
