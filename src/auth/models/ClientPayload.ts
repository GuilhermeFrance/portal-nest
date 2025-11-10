export interface ClientPayload {
  sub: number;
  email: string;
  name: string;
  surname: string;
  profileImgUrlId: number | null;
  badges: string | null;
  iat?: number;
  exp?: number;
}
