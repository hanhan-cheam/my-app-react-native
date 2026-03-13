import { formatMinutesToDayHourMinutes } from "@/utils/duration";
import { CSSProperties } from "react";
import { Text, View } from "react-native";

export type TWorkstationActivityCardProps = {
  workstationNo: string;
  jobNo: string;
  durationInMinute: number;
  activityUsername: string;
  activityTypeDescription: string;
  companyName: string;
  bgColor: CSSProperties["backgroundColor"];
};

export const WorkstationActivityCard = ({
  activityTypeDescription,
  jobNo,
  companyName,
  activityUsername,
  durationInMinute,
  workstationNo,
  bgColor,
}: TWorkstationActivityCardProps) => {
  return (
    <View className="rounded-xl overflow-hidden shadow-sm mb-3">
      {/* Header */}
      <View
        className="px-4 pt-4 pb-3 gap-1"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Text
          className="text-xs font-bold text-orange-900 text-right"
          numberOfLines={1}
        >
          {activityTypeDescription}
        </Text>
        <Text
          className="text-base font-semibold text-orange-700 text-center"
          numberOfLines={1}
        >
          {jobNo}
        </Text>

        {/* Footer row */}
        <View className="flex-row items-end justify-between mt-2">
          <Text className="text-xs text-gray-600 flex-1 mr-2" numberOfLines={1}>
            {companyName}
          </Text>
          <View className="items-end">
            <Text
              className="text-xs font-semibold text-gray-800"
              numberOfLines={1}
            >
              {activityUsername}
            </Text>
            <Text className="text-xs text-gray-500">
              {`since ${formatMinutesToDayHourMinutes(durationInMinute)} ago`}
            </Text>
          </View>
        </View>
      </View>

      {/* Workstation badge */}
      <View className="bg-white items-center py-2 px-4 border-t border-orange-200">
        <Text className="text-sm font-bold text-gray-700">{workstationNo}</Text>
      </View>
    </View>
  );
};
