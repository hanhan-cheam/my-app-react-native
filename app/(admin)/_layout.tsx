
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"

import { Text, TouchableOpacity, View } from "react-native";


function CustomDrawerContent(props: any) {
  async function handleLogout() {
   await SecureStore.deleteItemAsync("accessToken");
   router.replace("/");
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-5">
        {/* Avatar */}
        <View className="w-14 h-14 rounded-full bg-white items-center justify-center mb-3">
          <Text className="text-purple-600 text-2xl font-bold">P</Text>
        </View>
        <Text className="text-white font-bold text-xl">PingspaceApp</Text>
        <Text className="text-purple-200 text-sm mt-1">Admin Panel</Text>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 mx-4 my-2" />

      {/* Menu Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer */}
      <View className="border-t border-gray-100 p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-3 p-3 rounded-xl bg-red-50"
        >
          <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center">
            <Text className="text-red-500 font-bold">→</Text>
          </View>
          <Text className="text-red-500 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AdminLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerActiveTintColor: "#2563eb", // purple-600
        drawerInactiveTintColor: "#6b7280", // gray-500
        drawerActiveBackgroundColor: "#f3e8ff", // purple-100
        drawerLabelStyle: { fontSize: 15 },
        headerStyle: { backgroundColor: "#2563eb" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Station Operation Dashboard",
          drawerLabel: "Station Operation Dashboard",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerLabel: "Profile",
        }}
      />

      <Drawer.Screen
        name="index"
        options={{
          title: "Picking",
          drawerLabel: "Picking",
        }}
      />
    </Drawer>
  );
}
