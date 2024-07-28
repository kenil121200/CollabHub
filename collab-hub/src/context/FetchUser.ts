// Author: Jay Patel

export const getAuthenticaticatedUser = () => {
    let userData = localStorage.getItem("user");
    // console.log(userData)
    return userData ? JSON.parse(userData) : null;
};
  