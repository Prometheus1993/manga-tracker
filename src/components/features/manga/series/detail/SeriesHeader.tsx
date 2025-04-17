/**
 * Manga-themed header component for series details.
 * Displays title, statistics and progress information.
 */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSeriesStats from "@/src/hooks/manga/useSeriesStats";
import { SeriesHeaderProps } from "@/src/types/manga";
import { BlurView } from "expo-blur";

/**
 * Close button with manga-style design
 */
const HeaderButton = ({ onPress }) => (
  <TouchableOpacity style={styles.headerButton} onPress={onPress}>
    <View style={styles.buttonInner}>
      <Ionicons name="close" size={24} color="#FFF" />
    </View>
  </TouchableOpacity>
);

/**
 * Series title with manga-style typography
 */
const SeriesTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.seriesTitle}>{title}</Text>
    <View style={styles.titleUnderline} />
  </View>
);

/**
 * Stats display with manga-inspired design
 */
const SeriesStats = ({ ownedCount, totalVolumes, readCount, volumeCount }) => (
  <View style={styles.statsContainer}>
    <View style={styles.statsPanel}>
      <StatItem label="OWNED" value={`${ownedCount} / ${totalVolumes}`} />
      <View style={styles.statDivider} />
      <StatItem label="READ" value={`${readCount} / ${volumeCount}`} />
    </View>
  </View>
);

/**
 * Individual stat item with manga styling
 */
const StatItem = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

/**
 * Manga-styled progress bar
 */
const ProgressBar = ({ percentage }) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressBar}>
      <LinearGradient
        colors={['#FF5F6D', '#FFC371']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.progressFill, { width: `${percentage}%` }]}
      />
    </View>
    <Text style={styles.progressText}>{percentage}% Complete</Text>
  </View>
);

/**
 * Next volume indicators with manga icons
 */
const NextVolumeItem = ({ icon, color, volume, text }) => (
  <View style={styles.nextVolume}>
    <View style={[styles.iconBubble, { backgroundColor: color }]}>
      <Ionicons name={icon} size={16} color="#FFF" />
    </View>
    <Text style={styles.nextVolumeText}>
      {text}: <Text style={styles.volumeHighlight}>Vol. {volume}</Text>
    </Text>
  </View>
);

/**
 * Next volumes section
 */
const NextVolumes = ({ nextToBuy, nextToRead }) => (
  <View style={styles.nextVolumesContainer}>
    {nextToBuy && (
      <NextVolumeItem
        icon="cart-outline"
        color="#5E35B1"
        volume={nextToBuy}
        text="Next to buy"
      />
    )}
    {nextToRead && (
      <NextVolumeItem
        icon="book-outline"
        color="#43A047"
        volume={nextToRead}
        text="Next to read"
      />
    )}
  </View>
);

/**
 * Main series header component
 */
const SeriesHeader = ({ series, onClose }) => {
  const { readPercentage, ownedCount, totalVolumes, readCount } =
    useSeriesStats(series);
  const insets = useSafeAreaInsets();
  
  // Calculate status bar height for proper padding
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  return (
    <ImageBackground 
      source={{ uri: series.coverImage }} 
      style={[styles.headerBackground, { paddingTop: STATUSBAR_HEIGHT }]}
      blurRadius={10}
    >
      <BlurView intensity={75} style={styles.blurOverlay}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.gradientOverlay}
        >
          <HeaderButton onPress={onClose} />
          <View style={styles.coverContainer}>
            <View style={styles.coverImageWrapper}>
              <ImageBackground 
                source={{ uri: series.coverImage }} 
                style={styles.coverImage}
                imageStyle={styles.coverImageStyle}
              />
              <View style={styles.coverShadow} />
            </View>
            <View style={styles.headerContent}>
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
          </View>
        </LinearGradient>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  blurOverlay: {
    width: '100%',
  },
  gradientOverlay: {
    padding: 16,
    paddingBottom: 24,
    position: 'relative',
  },
  headerButton: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 10,
  },
  buttonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  coverContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  coverImageWrapper: {
    height: 150,
    width: 100,
    borderRadius: 8,
    marginRight: 16,
    position: 'relative',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  coverImage: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  coverImageStyle: {
    borderRadius: 8,
  },
  coverShadow: {
    position: 'absolute',
    right: -4,
    top: 4,
    bottom: -4,
    width: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomRightRadius: 4,
  },
  headerContent: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 8,
  },
  seriesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titleUnderline: {
    height: 3,
    width: '40%',
    backgroundColor: '#FF5F6D',
    marginTop: 4,
    borderRadius: 2,
  },
  statsContainer: {
    marginTop: 8,
  },
  statsPanel: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    textAlign: 'right',
  },
  nextVolumesContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nextVolume: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  iconBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  nextVolumeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  volumeHighlight: {
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default SeriesHeader;