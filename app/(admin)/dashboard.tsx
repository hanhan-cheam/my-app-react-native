


import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";


import { WorkstationActivityCard } from "@/components/common/WorkstationActivityCard/WorkstationActivityCard";
import { prettyConsole } from "@/utils/pretty-console";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getOperationDashboardApi, TGetOperationDashboardRes } from "@/api/wcs/dashboards.v3.api";
import { TSelectRes } from "@/api/wcs/res/select/select-res";
import { WorkstationActivityStatus } from "@/const/workstation-activity-status";

export default function DashboardScreen() {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [workstationActivityStatuses, setWorkstationActivityStatuses] =
    useState<TSelectRes[]>([]);

  const [workstationActivities, setWorkstationActivities] = useState<
    TGetOperationDashboardRes[]
  >([]);

  const statusChecker = useCallback((wa: TGetOperationDashboardRes) => {
    const workstationActivity = wa;

    const start: Dayjs = dayjs(wa.startTime);

    const isMoreThan1Hour = dayjs().diff(start, "hour") > 1;

    if (workstationActivity.jobId > 0) {
      if (isMoreThan1Hour) {
        return WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR;
      } else {
        return WorkstationActivityStatus.WIP;
      }
    } else {
      return WorkstationActivityStatus.AVAILABLE;
    }
  }, []);

  const getWorkstationBgColor = useMemo(
    () => (status: WorkstationActivityStatus) => {
      switch (status) {
        case WorkstationActivityStatus.AVAILABLE:
          return "#66b3ff";

        case WorkstationActivityStatus.WIP:
          return "#85e085";

        case WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR:
          return "#ffa64d";

        default:
          return "#FFFFFF";
      }
    },
    [],
  );

  const getWorkstationActivityStatusName = useMemo(
    () => (status: WorkstationActivityStatus) => {
      switch (status) {
        case WorkstationActivityStatus.AVAILABLE:
          return "Available";

        case WorkstationActivityStatus.WIP:
          return "Work In Progress";

        case WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR:
          return `Job started more than 1hr.`;
        // FE count the duration, BE only give start time //TODO

        default:
          return "Status not yet supported by client side";
      }
    },
    [],
  );

  const getWorkstationAlertDurationInMin = useMemo(
    () =>
      (status: WorkstationActivityStatus, binWaitingDurationInMin: number) => {
        return status === WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR
          ? binWaitingDurationInMin
          : 0;
      },
    [],
  );

  const getWorkstationAlertLabel = useMemo(
    () => (status: WorkstationActivityStatus) => {
      switch (status) {
        case WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR:
          return "Job Duration";

        default:
          return "";
      }
    },
    [],
  );

  const fetchOperationDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const { data: workstationActivityData } =
        await getOperationDashboardApi();

      const statusList = [
        {
          id: WorkstationActivityStatus.AVAILABLE,
          name: getWorkstationActivityStatusName(
            WorkstationActivityStatus.AVAILABLE,
          ),
        },
        {
          id: WorkstationActivityStatus.WIP,
          name: getWorkstationActivityStatusName(WorkstationActivityStatus.WIP),
        },
        {
          id: WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR,
          name: getWorkstationActivityStatusName(
            WorkstationActivityStatus.JOB_START_MORE_THAN_ONE_HOUR,
          ),
        },
      ];

      setWorkstationActivityStatuses(statusList);

      setWorkstationActivities(
        workstationActivityData.sort(
          (a, b) => a.workstationId - b.workstationId,
        ),
      );
    } catch (err) {
      // errorUIHandler(err);

      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [getWorkstationActivityStatusName]);

  const init = useCallback(async () => {
    try {
      setInitLoading(true);

      // const params: TGetOperationDashboardParams = {}

      await fetchOperationDashboardData();
    } finally {
      setInitLoading(false);
    }
  }, [fetchOperationDashboardData]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <ScrollView className="flex w-full gap-5 p-5">
      {/* workstation activities */}
      {initLoading ? (
        <Text>TODO LOADING</Text>
      ) : workstationActivities.length === 0 ? (
        <View className="col-span-3 flex h-[500px] w-full items-center justify-center">
          <Text>No workstation matches the activity</Text>
        </View>
      ) : (
        workstationActivities.map((wa, index) => {
          const {
            workstationNo,
            jobNo,
            startTime,
            activityUsername,
            activityTypeDescription,
            companyName,
          } = wa;

          const status = statusChecker(wa);

          // const start: Dayjs = dayjs(startTime);
          const start: Dayjs = dayjs.tz(startTime, "Asia/Kuala_Lumpur");

          // total minutes difference
          // const durationInMin = dayjs().diff(start, "minute");

          dayjs.extend(utc);
          dayjs.extend(timezone);

          const durationInMin = dayjs()
            .tz("Asia/Kuala_Lumpur") // take note the time zone , should we manual set ? or follow the device ?
            .diff(dayjs.tz(start, "Asia/Kuala_Lumpur"), "minute");

          prettyConsole(durationInMin);

          return (
            <WorkstationActivityCard
              key={index}
              activityTypeDescription={activityTypeDescription}
              jobNo={jobNo}
              bgColor={getWorkstationBgColor(status)}
              companyName={companyName}
              activityUsername={activityUsername}
              durationInMinute={durationInMin}
              workstationNo={workstationNo}
            />
          );
        })
      )}
    </ScrollView>
  );
}
