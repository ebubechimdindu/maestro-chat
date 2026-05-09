//Extends the built-in NodeJS namespace that TypeScript already knows about.
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: "development" | "production" | "test";
    MONGODB_URI: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    JWT_REFRESH_EXPIRES_IN?: string;
    CLIENT_URL?: string;
  }
}
