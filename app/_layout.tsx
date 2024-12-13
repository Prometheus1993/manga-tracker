/**
 * Hoofdcomponent voor de app layout die de navigatiestructuur en context opzet.
 * Gebruikt MangaProvider voor state beheer en Expo Router voor navigatie.
 */
import { MangaProvider } from "@/src/context/MangaProvider";
import { Stack } from "expo-router";

function AppLayout() {
  return (
    <MangaProvider>
      {/* Stack navigator zonder headers, voor tab navigatie */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </MangaProvider>
  );
}

export default AppLayout;
