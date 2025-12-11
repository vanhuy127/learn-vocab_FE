export interface IResponse<T> {
  success: boolean;
  message_code: string | null;
  data: T | null;
  error_code: string | null;
  errors: { field: string; error_code: string }[];
}

export interface IListResponse<T> {
  success: boolean;
  message_code: string | null;
  data: {
    data: T[];
    pagination: {
      total: number;
      page: number;
      size: number;
      totalPages: number;
    };
  };
  error_code: string | null;
  errors: { field: string; error_code: string }[];
}
