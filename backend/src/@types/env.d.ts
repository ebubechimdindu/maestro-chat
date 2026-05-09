//Extends the built-in NodeJS namespace that TypeScript already knows about.
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    NODE_ENV?: "development" | "production" | "test";
    MONGODB_URI: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: number;
    JWT_REFRESH_EXPIRES_IN?: number;
    CLIENT_URL?: string;
  }
}
