import { Observable } from 'rxjs';

export type JwtPayload = {
  userId: string;
};

export type TwitterToken = {
  access_token: string;
  refresh_token: string;
};

export type WillBe<T> = T | Promise<T> | Observable<T>;
