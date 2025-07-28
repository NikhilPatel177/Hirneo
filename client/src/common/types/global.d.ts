import 'axios';

declare module 'axios' {
  export interface AxiosError {
    _retry?: boolean;
  }
}
