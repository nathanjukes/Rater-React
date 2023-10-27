import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const resp = await axios.post(
      "/auth/refreshToken",
      JSON.stringify({ refreshToken: auth.refreshToken }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(
      "Token Refreshed: " +
        resp.data.accessToken +
        " Old token: " +
        auth.accessToken
    );
    setAuth((prev) => {
      return { ...prev, accessToken: resp.data.accessToken };
    });
    return resp.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
