/**
 * Component voor het weergeven van een manga serie.
 * Toont serie informatie, voortgang en volgende volumes om te kopen/lezen.
 */
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/src/styles/styles";
import { SeriesItemProps } from "@/src/types/manga";

const SeriesItem = ({ series, onPress }: SeriesItemProps) => (
  <TouchableOpacity style={styles.seriesItem} onPress={onPress}>
    <Image source={{ uri: series.coverImage }} style={styles.cover} />
    <View style={styles.info}>
      <Text style={styles.title}>{series.title}</Text>

      {/* Statistieken */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Owned</Text>
          <Text style={styles.statValue}>
            {series.volumes.length} / {series.totalVolumes || "?"}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Read</Text>
          <Text style={styles.statValue}>
            {series.readCount} / {series.volumes.length}
          </Text>
        </View>
      </View>

      {/* Volgende volumes */}
      {series.nextVolumeToBuy && (
        <View style={styles.nextVolume}>
          <Ionicons name="bookmark-outline" size={16} color="#007AFF" />
          <Text style={styles.nextVolumeText}>
            Next to buy: Volume {series.nextVolumeToBuy}
          </Text>
        </View>
      )}
      {series.nextVolumeToRead && (
        <View style={styles.nextVolume}>
          <Ionicons name="book-outline" size={16} color="#4CAF50" />
          <Text style={styles.nextVolumeText}>
            Next to read: Volume {series.nextVolumeToRead}
          </Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default SeriesItem;
