import axios from 'axios';
import ApiClient from '../../utils/api.client';
import { REQUEST_METHOD } from "../../utils/enums";

const API_URL = `${window.location.origin}/api/auth`;

class AuthService {
  async login(user) {
    return await ApiClient.request(API_URL + '/login', REQUEST_METHOD.POST, user)
      .then(response => {
        if (response.data.data.access_token) {
          localStorage.setItem('token', response.data.data.access_token);
        }
        return response.data;
      });
  }

  async logout() {
    return await ApiClient.request(API_URL + '/logout', REQUEST_METHOD.POST)
      .then(response => {
        return response.data;
      });
  }

  register(user) {
    return axios.post(API_URL + '/register', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }

  changePassword(userDetails) {
    const headers = {
      'Accept': 'application/json',
    };
    return axios
      .post(API_URL + '/password/change', userDetails, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  resendEmailVerification(userDetails) {
    const headers = {
      'Accept': 'application/json',
    };
    return axios
      .post(API_URL + '/email/verify/resend', userDetails, { headers: headers })
      .then(response => {
        return response.data;
      });
  }

  emailVerification(userDetails) {
    const headers = {
      'Accept': 'application/json',
    };

    const URL = API_URL + '/email/verify/' + userDetails['id'] + '/' + userDetails['hash'] + '?expires=' + userDetails['expires'] + '&signature=' + userDetails['signature'];

    return axios
      .get(URL, { headers: headers })
      .then(response => {
        return response.data;
      });
  }
}

export default new AuthService();
