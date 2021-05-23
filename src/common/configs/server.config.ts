import "dotenv/config";

export const serverConfig = {
  host: process.env.HOST!,
  port: process.env.PORT!,
};
