export interface ClientPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
