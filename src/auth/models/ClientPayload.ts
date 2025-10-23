export interface ClientPayload {
  sub: number;
  email: string;
  name: string;
  badges: string;
  iat?: number;
  exp?: number;
}
