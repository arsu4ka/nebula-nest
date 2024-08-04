import { ConfigType, registerAs } from '@nestjs/config';

const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpire: process.env.JWT_EXPIRE!,
}));

export default authConfig;
export type AuthConfig = ConfigType<typeof authConfig>;
