import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

 const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
        
      return token;
    }
  } catch (error) {
      
    return null
  }
};
const api = axios.create({
  baseURL: 'https://clap.solutions-apps.com/SmartClubApp', // Replace with your API's base URL
  timeout: 5000, // Set the request timeout (optional)
});
// Add an interceptor to set the Authorization header
api.interceptors.request.use(config => {
    const token ="asdasdsa";
    if (token) {
      getToken().then(res =>{
        if(res.length>15){
          config.headers['Authorization'] = `Bearer ${res}`;
    
        }
   })
      
      
    }
    config.headers['Content-Type'] = `multipart/form-data`;
    return config;
  }, error => {
    return Promise.reject(error);
  });
  


const apiNews = axios.create({
  baseURL: 'https://prod-api.foxsports.com/', // Replace with your API's base URL

});
// Add an interceptor to set the Authorization header

  
export default {
  apiNews,
  api
};
