import * as jose from "jose";

const secret = new TextEncoder().encode("secret_jwt_sign"); // this will be in .env
const alg = "HS256";

export const signJwt = async (data: any) => {
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1m")
    .sign(secret);
  return jwt;
};

export const varifyJwt = async (token: any) => {
  const varify = await jose.jwtVerify(token, secret);
  return varify;
};
