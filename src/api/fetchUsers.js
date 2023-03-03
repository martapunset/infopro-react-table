
export const getUsers = async () => {
   
    try {

        const url = `http://localhost:4000/users/`;
        const resp = await fetch(url);
        const apiData = await resp.json();
        return apiData.data;
      } catch (error) {
        console.log("Error");
    }
    
  };