import { httpApiV3 } from "@/lib/http/http";
import { T_APIResponse } from "./res/common/api-res-body";

export type TGetOperationDashboardRes = {
  workstationId: number;
  workstationNo: string;
  jobId: number;
  jobNo: string;
  startTime: string | Date;
  activityUsername: string;
  activityType: number;
  activityTypeDescription: string;
  companyId: number;
  companyName: string;
};

export const getOperationDashboardApi = async () => {
  const data = await httpApiV3.get<T_APIResponse<TGetOperationDashboardRes[]>>(
    "Dashboards/workstations",
  );
  return data;
};
