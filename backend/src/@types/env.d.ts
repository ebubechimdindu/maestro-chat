declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    NODE_ENV?: "development" | "production" | "test";
    MONGODB_URI: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: number;
    JWT_REFRESH_EXPIRES_IN?: number;
    CLIENT_URL?: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_SERVICE_SID: string
    TWILIO_AUTH_TOKEN: string;
    NYLAS_API_KEY: string
    USER_GRANT_ID: string
  }
}
