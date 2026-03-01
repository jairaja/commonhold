import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

import { hasSupabaseCredentials, supabase } from '../lib/supabase';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const trimmedEmail = useMemo(() => email.trim(), [email]);
  const canSubmit = trimmedEmail.length > 0 && password.length >= 6 && !isBusy && hasSupabaseCredentials;

  const signInWithEmail = async () => {
    if (!supabase) {
      setMessage('Supabase credentials are missing. Add them to your environment.');
      return;
    }

    setIsBusy(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });

    setIsBusy(false);
    setMessage(error ? error.message : null);
  };

  const signUpWithEmail = async () => {
    if (!supabase) {
      setMessage('Supabase credentials are missing. Add them to your environment.');
      return;
    }

    setIsBusy(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
    });

    setIsBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage('Check your email for the confirmation link to complete sign up.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.container}>
          <Text variant="headlineMedium">Commonhold</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Sign in to manage properties, tenants, and maintenance requests.
          </Text>

          <Card>
            <Card.Content style={styles.cardContent}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
                autoComplete="password"
              />

              <Button mode="contained" onPress={signInWithEmail} disabled={!canSubmit} loading={isBusy}>
                Sign in
              </Button>

              <Button mode="outlined" onPress={signUpWithEmail} disabled={!canSubmit} loading={isBusy}>
                Create account
              </Button>

              {message ? <Text style={styles.message}>{message}</Text> : null}
              {!hasSupabaseCredentials ? (
                <Text style={styles.warning}>
                  Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY to enable auth.
                </Text>
              ) : null}
              {password.length > 0 && password.length < 6 ? (
                <Text style={styles.warning}>Password must be at least 6 characters.</Text>
              ) : null}
            </Card.Content>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
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
    gap: 12,
  },
  message: {
    marginTop: 4,
  },
  warning: {
    color: '#b00020',
    marginTop: 4,
  },
});
