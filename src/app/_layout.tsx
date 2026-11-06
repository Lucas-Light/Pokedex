import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Rubik_500Medium } from "@expo-google-fonts/rubik";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { queryClient } from "@/api/queryClient";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [fonts.title]: require("@/assets/fonts/CabinetGrotesk-Extrabold.otf"),
    [fonts.body]: Rubik_500Medium,
    [fonts.input]: Inter_400Regular,
    [fonts.tabLabel]: Roboto_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{ title: "", headerBackButtonDisplayMode: "minimal" }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
