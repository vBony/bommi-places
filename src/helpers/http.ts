import axios from 'axios'
import { useUserStore } from '@/store/user';
import $ from "jquery";

const req = () => {
    const defaultOptions = {
        baseURL: import.meta.env.VITE_SERVER_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    };
  
    // Create instance
    let instance = axios.create(defaultOptions);
  
    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        $('#loading').fadeToggle(500)
        const token = useUserStore().getToken;
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    },
    (error) => {
        $('#loading').fadeToggle(500)
        return Promise.reject(error);
    });

    instance.interceptors.response.use((response) => {
        $('#loading').fadeToggle(500)
        return response;
    }, (error) => {
        $('#loading').fadeToggle(500)
        return Promise.reject(error);
    });
  
    return instance;
};
  
export default req();
