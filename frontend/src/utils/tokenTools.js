import { useJwt } from "react-jwt";


export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const useJWT = (token) => {
    const { decodedToken, isExpired } = useJwt(token);
    return {
      decodedToken,
      isExpired,
    };
  };