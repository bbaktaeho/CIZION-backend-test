import "dotenv/config";

export const jwtConfig = {
  secret: process.env.JWT_SECRET!,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
  //   refreshTokenExpiresIn: "",
};
