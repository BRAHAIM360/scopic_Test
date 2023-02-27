import axios from "../../helpers/axios";
import jwt_decode from "jwt-decode";

// Login user
const login = async (userData: { username: string; password: string }) => {
  const response = await axios.post(`/auth/signin`, userData, {
    headers: { Accept: "application/json" },
  });

  if (response.data) {
    // console.log('%c⧭', 'color: #00a3cc', response.data);
    const access_token: string = response.data.access_token;
    const { isAdmin } = jwt_decode(access_token) as any;
    const user = {
      access_token,
      isAdmin,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  return response.data;
};

const authService = { login };

export default authService;
