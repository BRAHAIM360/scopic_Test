import axios from "../../helpers/axios";

// Login user
const login = async (userData: { username: string; password: string }) => {
  const response = await axios.post(`/auth/signin`, userData, {
    headers: { Accept: "application/json" },
  });

  if (response.data) {
    // console.log('%c⧭', 'color: #00a3cc', response.data);
    const user = {
      access_token: response.data.access_token,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  return response.data;
};

const authService = { login };

export default authService;
