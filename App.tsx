import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { RootNavigator } from './src/navigation/RootNavigator';
import { appTheme } from './src/theme/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={appTheme}>
        <StatusBar style="auto" />
        <RootNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
