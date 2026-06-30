import { jwtDecode } from "jwt-decode";
import { appLogger } from "./loggers";

interface TokenPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export const isTokenExpired = (token: string) => {
  try {
    const decodedToken = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000);
      const issuedAtDate = new Date((decodedToken?.iat ?? 0) * 1000)
      appLogger(`Token expires at: ${expirationDate.toLocaleString()}`, {
        fileName: 'tokenUtils',
        data: {
          exp: decodedToken.exp,
          iat: issuedAtDate.toLocaleString(),
          expirationDate: expirationDate.toISOString(),
          isExpired: decodedToken.exp < currentTime
        }
      });
    }

    return decodedToken.exp ? decodedToken.exp < currentTime : false;
  } catch (e: any) {
    appLogger(`Token decoding error: ${e?.message}`, {
      level: 'error',
      fileName: 'tokenUtils'
    });
    // If decoding fails, treat it as expired
    return true;
  }
};
