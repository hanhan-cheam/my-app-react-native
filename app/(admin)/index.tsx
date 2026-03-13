// import { Redirect } from "expo-router";


import { Text, View } from "react-native";

// export default function Index() {
//   return <Redirect href="/login" />;
// }

const columns = [
  { key: "name", label: "Name" },
  { key: "calories", label: "Calories", numeric: true },
  { key: "fat", label: "Fat", numeric: true },
];

const data = [
  { name: "Cupcake", calories: 356, fat: 16 },
  { name: "Eclair", calories: 262, fat: 16 },
  { name: "Frozen yogurt", calories: 159, fat: 6 },
  { name: "Gingerbread", calories: 305, fat: 3.7 },
];

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center w-full p-5">
      <Text>Welcome Home!</Text>
    </View>
  );
}
