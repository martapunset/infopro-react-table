
import axios from 'axios';
export const getUsers = async () => {
   
    try {
        //
        const url = `http://localhost:4000/users/`;
    
        const resp = await fetch(url);
        const apiData = await resp.json();
        console.log(apiData.data);
        return apiData.data;
      } catch (error) {
        console.log("Algo fallo en la api");
    }
    
    /*
    axios.get('http://localhost:4000/users')
      .then(response => {
        console.log(response.data);
          
      })
      .catch(error => {
        console.error("failed to fetch data");
      });
      return response.data;
      */
  };