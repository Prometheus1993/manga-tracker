/**
 * Service voor het beheren van leeslocaties met GPS coördinaten
 */
import * as Location from "expo-location";
import { storage } from "@/src/utils/storage";
import { ReadingLocation } from "@/src/types/manga";
import { Platform } from "react-native";

const locationService = {
  /**
   * Vraagt toestemming voor locatietoegang
   */
  async requestPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  },

  /**
   * Haalt huidige locatie op, met simulator ondersteuning voor iOS
   */
  async getCurrentLocation(): Promise<Location.LocationObject | null> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return null;

    if (Platform.OS === "ios") {
      // Test locatie voor simulator
      return {
        coords: {
          latitude: 51.2194,
          longitude: 4.4025,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0,
        },
        timestamp: Date.now(),
      };
    }

    return await Location.getCurrentPositionAsync({});
  },

  /**
   * Slaat een nieuwe leeslocatie op met naam en beschrijving
   */
  async saveLocation(
    name: string,
    description?: string
  ): Promise<ReadingLocation> {
    const location = await this.getCurrentLocation();
    if (!location) throw new Error("Cannot access location");

    const newLocation: ReadingLocation = {
      id: Date.now().toString(),
      name,
      description,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: Date.now(),
    };

    const locations = await this.getLocations();
    await storage.set("READING_LOCATIONS", [...locations, newLocation]);

    return newLocation;
  },

  // CRUD operaties voor locaties
  async deleteLocation(id: string): Promise<void> {
    const locations = await this.getLocations();
    const updatedLocations = locations.filter((location) => location.id !== id);
    await storage.set("READING_LOCATIONS", updatedLocations);
  },

  async getLocations(): Promise<ReadingLocation[]> {
    return (await storage.get("READING_LOCATIONS")) ?? [];
  },
};

export default locationService;
