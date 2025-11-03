export interface ClientPayload {
  sub: number;
  email: string;
  name: string;
  surname: string;
  badges: string | null;
  iat?: number;
  exp?: number;
}
