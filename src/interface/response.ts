export interface IResponse<T> {
  success: boolean;
  message_code: string | null;
  data: T | null;
  messages: { field: string; error_code: string }[];
}

export interface IListResponse<T> {
  success: boolean;
  message_code: string | null;
  data: {
    data: T;
    pagination: {
      total: number;
      page: number;
      size: number;
      totalPages: number;
    };
  };
  messages: { field: string; error_code: string }[];
}
