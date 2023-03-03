
import axios from 'axios';
export const getUsers = async () => {
   

    axios.get('http://localhost:4000/users')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("failed to fetch data");
      });
  };