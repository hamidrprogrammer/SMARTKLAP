
import api from '../api'
const fetchTeams = async (clubToken, userId) => {
    try {
      const formData = new FormData();
      formData.append('clubToken', clubToken);
      formData.append('userId', userId);
  
      const response = await axios.post(
        'https://your-api-endpoint.com/getTeams',
        formData,
        { headers: { Authorization: 'Bearer your_token', 'Content-Type': 'multipart/form-data' } }
      );
  
      const resp = response.data;
      if (resp.Status === 1) {
        // Success
        if (resp.Data.state === 1) {
          // Teams available
          return resp.Data.DataContent;
        }
      }
    } catch (error) {
        
    }
  
    return [];
  };
  
  export default {
    fetchTeams,
  };
