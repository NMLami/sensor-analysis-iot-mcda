import jwt_decode from "jwt-decode";

const addToken = token => {
    localStorage.setItem('token', token);
  }
  
  const getToken = () => localStorage.getItem('token');
  
//   const updateDb = cart => {
//     localStorage.setItem('shopping_cart', JSON.stringify(cart));
//   }


const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  }

  const userLoggedIn = () => {
    const token = getToken();
    if(token){
    const user = jwt_decode(token)
    return user
    }else{
        return false;
    }
  }
  
//   const getStoredCart = () => {
//     const exists = getDb();
//     return exists ? JSON.parse(exists) : {};
//   }
  
//   const clearTheCart = () => {
//     localStorage.removeItem('shopping_cart');
//   }
  
  export { addToken, getToken, logout,userLoggedIn }