export interface IApiResponse<T> {
  code: number;
  success: boolean;
  request_meta?: {
    request_id?: string;
  };
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message: string;
  data: T;
}

export { IApiResponse };
