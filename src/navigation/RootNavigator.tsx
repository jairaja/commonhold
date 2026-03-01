import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { supabase } from '../lib/supabase';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { useAppStore } from '../store/useAppStore';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export function RootNavigator() {
  const session = useAppStore((state) => state.session);
  const isLoadingSession = useAppStore((state) => state.isLoadingSession);
  const setSession = useAppStore((state) => state.setSession);
  const setIsLoadingSession = useAppStore((state) => state.setIsLoadingSession);

  useEffect(() => {
    if (!supabase) {
      setIsLoadingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setIsLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setIsLoadingSession, setSession]);

  if (isLoadingSession) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Commonhold' }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Sign in' }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
