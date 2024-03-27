export namespace Login {
  export interface Form {
    username: string;
    password: string;
  }
  export interface Response {
    access_token: string;
  }
}

// 文件上传
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 响应（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 响应
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}
