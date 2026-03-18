import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';

import { ActivityIndicator, View } from 'react-native';
import { Eye, EyeOff, QrCode, ChevronDown } from 'lucide-react-native';

// RNR components
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginApi } from '@/api/wcs/auth';

export default function LoginScreen() {
  const { signIn, token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && token) {
      router.replace('/(admin)/dashboard');
    }
  }, [token, isLoading]);

  const [workstationInputMethod, setWorkstationInputMethod] = useState<'scan' | 'dropdown'>('scan');
  const [workstationId, setWorkstationId] = useState<number | null>(null);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!username) {
      setUsernameError('Username must be provided.');
      return;
    }
    if (!password) {
      setPasswordError('Password must be provided.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await loginApi({
        usernameOrEmail: username,
        password,
        ...(workstationId ? { workstationId } : {}),
      });

      if (data.resultCode === 'success') {
        await signIn(data.data.accessToken);
        await SecureStore.setItemAsync('fullName', data.data.fullName);
        await SecureStore.setItemAsync('role', data.data.platformRoleAccess);
      } else {
        setError('Invalid username or password');
      }
    } catch (e) {
      console.log(e);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center bg-background p-6">
      {/* Header */}
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold tracking-widest text-foreground">PINGSPACE</Text>
        <Text className="mt-1 text-sm text-muted-foreground">Management Console</Text>
      </View>

      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>

        <CardContent className="gap-4">
          {/* Workstation Input Method */}
          <View>
            <Label className="mb-2">Workstation Input Method</Label>
            <View className="flex-row gap-4">
              {(['scan', 'dropdown'] as const).map((method) => (
                <Button
                  key={method}
                  variant={workstationInputMethod === method ? 'default' : 'outline'}
                  size="sm"
                  onPress={() => setWorkstationInputMethod(method)}
                  className="flex-1">
                  <Text className="capitalize">{method}</Text>
                </Button>
              ))}
            </View>
          </View>

          {/* Workstation Field */}
          <View className="gap-1.5">
            <Label>Workstation</Label>
            <View className="relative">
              <Input
                placeholder={
                  workstationInputMethod === 'scan'
                    ? 'Scan workstation QR...'
                    : 'Select workstation...'
                }
                className="pr-10"
              />
              <View className="absolute right-3 top-3">
                {workstationInputMethod === 'scan' ? (
                  <QrCode size={18} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={18} className="text-muted-foreground" />
                )}
              </View>
            </View>
          </View>

          {/* Username */}
          <View className="gap-1.5">
            <Label>Username / Email</Label>
            <Input
              placeholder="Username / Email"
              value={username}
              onChangeText={(val) => {
                setUsername(val);
                setUsernameError('');
              }}
              autoCapitalize="none"
              className={usernameError ? 'border-destructive' : ''}
            />
            {usernameError ? (
              <Text className="text-xs text-destructive">{usernameError}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View className="gap-1.5">
            <Label>Password</Label>
            <View className="relative">
              <Input
                placeholder="Password"
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                  setPasswordError('');
                }}
                secureTextEntry={!showPassword}
                onSubmitEditing={handleLogin}
                className={`pr-10 ${passwordError ? 'border-destructive' : ''}`}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} className="text-muted-foreground" />
                ) : (
                  <Eye size={18} className="text-muted-foreground" />
                )}
              </Button>
            </View>
            {passwordError ? (
              <Text className="text-xs text-destructive">{passwordError}</Text>
            ) : null}
          </View>

          {/* Forgot Password */}
          <Button variant="ghost" className="-mt-2 h-auto self-end py-0">
            <Text className="text-sm text-primary">Forgot password?</Text>
          </Button>

          {/* General Error */}
          {error ? <Text className="text-center text-sm text-destructive">{error}</Text> : null}

          {/* Login Button */}
          <Button onPress={handleLogin} disabled={loading} className="mt-2">
            {loading ? <ActivityIndicator color="white" /> : <Text>Log In</Text>}
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
