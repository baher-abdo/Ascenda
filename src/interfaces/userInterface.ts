export interface RegistrationInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginDataInterface extends RegistrationInterface {
  name: string;
  email: string;
}
export interface UserCheckInterface {
  location: string;
  from: string;
  to: string;
  adults: number;
  children: number;
  rooms: number;
  night: number;
}
