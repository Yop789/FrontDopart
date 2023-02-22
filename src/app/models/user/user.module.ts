export interface User {
  username: string;
  lastName: string;
  email: string;
  password: string;
  municipio: string;
  comunidad: string;
  calle: string;
  numero: string;
  telefone: string;
  roles?: [],
}
export interface email {
  email: string;
  password: string;
}
export interface emailCodigo {
  correoElectronico: string;
  password?:string
  codigo?:string
}
