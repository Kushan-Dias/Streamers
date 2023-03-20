import axios from "axios";
import store from '../store';
import { REQUEST_METHOD } from './enums';
import $ from 'jquery';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
    this.url = null;
    this.method = null;
    this.data = null;
    this.headers = {
      'Accept': 'application/json',
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      'Content-Language':  store.getters["localization/lang"],
    };
    this.response = null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  reformatURL(url) {
    // url -> /some-endpoint
    if (url.startsWith('/')) {
      return `${window.location.origin}${url}`;
    } else {
      // url -> valid url
      if (url.startsWith(window.location.origin) || url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      } else { // url -> some-endpoint in our origin
        return `${window.location.origin}/${url}`;
      }
    }
  }

  async request(url, method, data = null, headers = {}, authorized = true) {

    Object.assign(this.headers, headers);
    url = this.reformatURL(url);

    this.url = url;
    this.method = method;
    this.data = data;
    if (authorized) {
      Object.assign(this.headers, {
        'Authorization': `Bearer ${this.getToken()}`,
      });
    }

    console.log(this.url, this.method, this.headers, this.data);

    switch (method) {
      case REQUEST_METHOD.GET:
        return await axios.get(url, { headers: this.headers });
      case REQUEST_METHOD.POST:
        return await axios.post(url, data, { headers: this.headers });
      case REQUEST_METHOD.PUT:
        return await axios.put(url, data, { headers: this.headers });
      case REQUEST_METHOD.DELETE:
        return await axios.delete(url, { headers: this.headers });
    }
  }
}

export default new ApiClient();
