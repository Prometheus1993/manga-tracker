/**
 * Manga-styled checklist view of volumes within a series.
 * Displays volume information with read status in a list format.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  FlatList,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import useVolumeSort from "@/src/hooks/manga/useVolumeSort";

/**
 * Volume list item with manga-style design
 */
const VolumeItem = ({ volume, onPress, onLongPress }) => {
  // Animation for press feedback
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.itemContainer, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        style={[styles.volumeItem, volume.isRead && styles.volumeItemRead]}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        {/* Volume number marker */}
        <View
          style={[
            styles.volumeNumberBadge,
            volume.isRead && styles.volumeNumberBadgeRead,
          ]}
        >
          <Text style={styles.volumeNumberText}>{volume.volumeNumber}</Text>
        </View>

        {/* Volume info */}
        <View style={styles.volumeInfo}>
          <Text style={styles.volumeTitle}>Volume {volume.volumeNumber}</Text>
          {volume.title && (
            <Text style={styles.volumeSubtitle} numberOfLines={1}>
              {volume.title.replace(`Vol. ${volume.volumeNumber}`, "")}
            </Text>
          )}
        </View>

        {/* Read status */}
        <View style={styles.statusSection}>
          {volume.isRead ? (
            <View style={styles.readStatus}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.statusText}>Read</Text>
            </View>
          ) : (
            <View style={styles.unreadStatus}>
              <Ionicons name="ellipse-outline" size={24} color="#757575" />
              <Text style={styles.statusText}>Unread</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const VolumeList = ({ volumes, onVolumePress, onVolumeLongPress }) => {
  const sortedVolumes = useVolumeSort(volumes);

  // Group volumes by read status
  const [filterType, setFilterType] = useState("all"); // all, read, unread

  const filteredVolumes = () => {
    switch (filterType) {
      case "read":
        return sortedVolumes.filter((v) => v.isRead);
      case "unread":
        return sortedVolumes.filter((v) => !v.isRead);
      default:
        return sortedVolumes;
    }
  };

  // Calculate counts for filters
  const totalVolumes = sortedVolumes.length;
  const readVolumes = sortedVolumes.filter((v) => v.isRead).length;

  // Get cover image from first volume if available
  const coverImage =
    volumes.length > 0 && volumes[0].coverImage ? volumes[0].coverImage : null;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={coverImage ? { uri: coverImage } : null}
        style={styles.backgroundImage}
        blurRadius={30}
      >
        <LinearGradient
          colors={["rgba(30, 20, 60, 0.88)", "rgba(30, 20, 60, 0.75)"]}
          style={styles.gradientOverlay}
        >
          {/* Filter tabs */}
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[
                styles.filterTab,
                filterType === "all" && styles.activeFilterTab,
              ]}
              onPress={() => setFilterType("all")}
            >
              <Text
                style={[
                  styles.filterTabText,
                  filterType === "all" && styles.activeFilterTabText,
                ]}
              >
                All ({totalVolumes})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterTab,
                filterType === "read" && styles.activeFilterTab,
              ]}
              onPress={() => setFilterType("read")}
            >
              <Text
                style={[
                  styles.filterTabText,
                  filterType === "read" && styles.activeFilterTabText,
                ]}
              >
                Read ({readVolumes})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterTab,
                filterType === "unread" && styles.activeFilterTab,
              ]}
              onPress={() => setFilterType("unread")}
            >
              <Text
                style={[
                  styles.filterTabText,
                  filterType === "unread" && styles.activeFilterTabText,
                ]}
              >
                Unread ({totalVolumes - readVolumes})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Volume list */}
          <FlatList
            data={filteredVolumes()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <VolumeItem
                volume={item}
                onPress={() => onVolumePress(item.id)}
                onLongPress={() => onVolumeLongPress(item.id, item.title)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="book-outline" size={48} color="#FFFFFF" />
                <Text style={styles.emptyText}>No volumes found</Text>
                <Text style={styles.emptySubtext}>Try changing the filter</Text>
              </View>
            }
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  gradientOverlay: {
    flex: 1,
    paddingTop: 8,
  },
  filterTabs: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
  },
  activeFilterTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  volumeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  volumeItemRead: {
    backgroundColor: "rgba(76, 175, 80, 0.15)",
  },
  volumeNumberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  volumeNumberBadgeRead: {
    backgroundColor: "rgba(76, 175, 80, 0.8)",
    borderColor: "rgba(76, 175, 80, 0.3)",
  },
  volumeNumberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  volumeInfo: {
    flex: 1,
    justifyContent: "center",
  },
  volumeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  volumeSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
  },
  statusSection: {
    paddingHorizontal: 8,
  },
  readStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 4,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 8,
  },
});

export default VolumeList;
