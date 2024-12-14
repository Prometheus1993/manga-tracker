/**
 * API configuratie voor verschillende omgevingen
 * Handelt verschillende URLs af voor development en productie
 */
import { Platform } from "react-native";

const LOCAL_IP = "10.150.192.20"; // IP voor lokale ontwikkeling

/**
 * Bepaalt de juiste base URL gebaseerd op omgeving en platform
 */
const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000"; // Specifiek voor Android emulator
    }
    if (Platform.OS === "ios") {
      return "http://localhost:3000"; // Lokale iOS ontwikkeling
    }
    return `http://${LOCAL_IP}:3000`; // Voor fysieke apparaten
  }
  return "https://your-production-api.com";
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  MAL_URL: "https://api.myanimelist.net/v2",
  endpoints: {
    manga: "/mangas",
    search: "/manga",
  },
} as const;
