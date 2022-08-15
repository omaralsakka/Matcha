import { useJwt } from "react-jwt";

const useJWT = (token) => {
  const { decodedToken, isExpired } = useJwt(token);
  return {
    decodedToken,
    isExpired,
  };
};

export default useJWT;
