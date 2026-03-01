import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { supabase } from '../lib/supabase';
import { useAppStore } from '../store/useAppStore';

export function HomeScreen() {
  const user = useAppStore((state) => state.user);

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text variant="headlineMedium">Welcome to Commonhold</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          You are signed in and ready to manage your portfolio.
        </Text>

        <Card>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleMedium">Profile</Text>
            <Text variant="bodyMedium">Email: {user?.email ?? 'Unknown'}</Text>
            <Text variant="bodySmall">User ID: {user?.id ?? 'Unknown'}</Text>
          </Card.Content>
        </Card>

        <Button mode="contained-tonal" onPress={signOut}>
          Sign out
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
  cardContent: {
    gap: 8,
  },
});
