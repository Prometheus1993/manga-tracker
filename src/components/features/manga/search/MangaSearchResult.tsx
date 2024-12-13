/**
 * Component voor het weergeven van zoekresultaten van MAL.
 * Toont manga cover, titel en beschikbare volumes.
 */
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "@/src/styles/styles";
import { MangaSearchResultProps } from "@/src/types/manga";

const MangaSearchResult = ({ manga, onPress }: MangaSearchResultProps) => (
  <TouchableOpacity style={styles.searchResult} onPress={onPress}>
    <Image
      source={{
        uri:
          manga.node.main_picture?.medium ||
          "https://via.placeholder.com/128x128.png?text=No+Image",
      }}
      style={styles.cover}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{manga.node.title}</Text>
      <Text style={styles.addText}>
        {manga.node.num_volumes
          ? `${manga.node.num_volumes} volumes available`
          : "Tap to add to collection"}
      </Text>
    </View>
  </TouchableOpacity>
);

export default MangaSearchResult;
