import { useEffect } from 'react';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/context/auth';

function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-600 px-5 pb-6 pt-12">
        {/* Avatar */}
        <View className="mb-3 h-14 w-14 items-center justify-center rounded-full bg-white">
          <Text className="text-2xl font-bold text-purple-600">P</Text>
        </View>
        <Text className="text-xl font-bold text-white">PingspaceApp</Text>
        <Text className="mt-1 text-sm text-purple-200">Admin Panel</Text>
      </View>

      {/* Divider */}
      <View className="mx-4 my-2 h-px bg-gray-100" />

      {/* Menu Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer */}
      <View className="border-t border-gray-100 p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-3 rounded-xl bg-red-50 p-3">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <Text className="font-bold text-red-500">→</Text>
          </View>
          <Text className="font-semibold text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AdminLayout() {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/');
    }
  }, [token, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!token) return null;

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerActiveTintColor: '#2563eb',
        drawerInactiveTintColor: '#6b7280',
        drawerActiveBackgroundColor: '#f3e8ff',
        drawerLabelStyle: { fontSize: 15 },
        headerStyle: { backgroundColor: '#2563eb' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Station Operation Dashboard',
          drawerLabel: 'Station Operation Dashboard',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          title: 'Picking',
          drawerLabel: 'Picking',
        }}
      />
    </Drawer>
  );
}
