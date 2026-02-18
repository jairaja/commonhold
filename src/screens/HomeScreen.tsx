import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { hasSupabaseCredentials } from '../lib/supabase';
import { useAppStore } from '../store/useAppStore';

export function HomeScreen() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const setAuthenticated = useAppStore((state) => state.setAuthenticated);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text variant="headlineMedium">Commonhold</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Expo + React Native + TypeScript + Zustand starter with Supabase.
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Backend status</Text>
            <Text variant="bodyMedium" style={styles.body}>
              {hasSupabaseCredentials
                ? 'Supabase keys detected. Ready to connect.'
                : 'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to start using Supabase.'}
            </Text>
          </Card.Content>
        </Card>

        <Button mode="contained" onPress={() => setAuthenticated(!isAuthenticated)}>
          {isAuthenticated ? 'Sign out (demo state)' : 'Sign in (demo state)'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  subtitle: {
    opacity: 0.75,
  },
  card: {
    marginVertical: 8,
  },
  body: {
    marginTop: 8,
  },
});
