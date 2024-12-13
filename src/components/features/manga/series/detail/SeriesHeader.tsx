/**
 * Header component voor serie details.
 * Toont titel, statistieken en voortgangsinformatie.
 */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  useSeriesStats  from "@/src/hooks/manga/useSeriesStats";
import styles from "@/src/styles/styles";
import { SeriesHeaderProps } from "@/src/types/manga";

/**
 * Subcomponent voor statistiek items in de header
 */
const HeaderButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.headerButton} onPress={onPress}>
    <Ionicons name="close" size={24} color="#000" />
  </TouchableOpacity>
);

const SeriesTitle = ({ title }: { title: string }) => (
  <Text style={styles.seriesTitle}>{title}</Text>
);

const SeriesStats = ({
  ownedCount,
  totalVolumes,
  readCount,
  volumeCount,
}: any) => (
  <View style={styles.statsRow}>
    <StatItem label="Owned" value={`${ownedCount} / ${totalVolumes}`} />
    <StatItem label="Read" value={`${readCount} / ${volumeCount}`} />
  </View>
);

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <View style={styles.progressBar}>
    <View style={[styles.progressFill, { width: `${percentage}%` }]} />
  </View>
);

const NextVolumeItem = ({ icon, color, volume, text }: any) => (
  <View style={styles.nextVolume}>
    <Ionicons name={icon} size={16} color={color} />
    <Text style={styles.nextVolumeText}>
      {text}: Vol. {volume}
    </Text>
  </View>
);

const NextVolumes = ({
  nextToBuy,
  nextToRead,
}: {
  nextToBuy?: number;
  nextToRead?: number;
}) => (
  <>
    {nextToBuy && (
      <NextVolumeItem
        icon="cart-outline"
        color="#007AFF"
        volume={nextToBuy}
        text="Next to buy"
      />
    )}
    {nextToRead && (
      <NextVolumeItem
        icon="book-outline"
        color="#4CAF50"
        volume={nextToRead}
        text="Next to read"
      />
    )}
  </>
);
const SeriesHeader = ({ series, onClose }: SeriesHeaderProps) => {
  const { readPercentage, ownedCount, totalVolumes, readCount } =
    useSeriesStats(series);

  return (
    <View style={styles.seriesHeader}>
      <HeaderButton onPress={onClose} />
      <SeriesTitle title={series.title} />
      <SeriesStats
        ownedCount={ownedCount}
        totalVolumes={totalVolumes}
        readCount={readCount}
        volumeCount={series.volumes.length}
      />
      <ProgressBar percentage={readPercentage} />
      <NextVolumes
        nextToBuy={series.nextVolumeToBuy}
        nextToRead={series.nextVolumeToRead}
      />
    </View>
  );
};

export default SeriesHeader;
