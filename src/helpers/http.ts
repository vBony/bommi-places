import axios from 'axios'
import { useUserStore } from '@/store/user';

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
        const token = useUserStore().getToken;
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });
  
    return instance;
};
  
export default req();
