/**
 * Herbruikbare manga item component.
 * Toont cover, titel en leesstatus of aangepaste rechterkant content.
 */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "@/src/styles/styles";
import { MangaItemProps } from "@/src/types/manga";

const MangaItem = ({
  title,
  coverImage,
  isRead,
  onPress,
  rightComponent,
}: MangaItemProps) => (
  <TouchableOpacity style={styles.mangaItem} onPress={onPress}>
    <Image source={{ uri: coverImage }} style={styles.cover} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent || (
        <View
          style={[
            styles.readBadge,
            { backgroundColor: isRead ? "#4CAF50" : "#9e9e9e" },
          ]}
        >
          <Text style={styles.readText}>{isRead ? "Read ✓" : "Unread"}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default MangaItem;
