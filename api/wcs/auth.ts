import { httpApiV2 } from "@/lib/http/http";
import { T_APIResponse } from "./res/common/api-res-body";


type TLoginReq = {
  usernameOrEmail: string;
  password: string;
  workstationId?: number;
};

type TLoginRes = {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  accessToken: string;
  platformRoleAccess: string;
};

// type TAPIResponse<T> = {
//   result: number;
//   resultCode: string;
//   errors: string | null;
//   data: T;
// };

export const loginApi = async (payload: TLoginReq) => {
  const data = await httpApiV2.post<T_APIResponse<TLoginRes>>("Users/login", {
    model: payload,
  });
  return data;
};
