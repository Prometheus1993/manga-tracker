/**
 * Component voor het weergeven van ongelezen manga's.
 * Biedt mogelijkheid om leessessies toe te voegen.
 */
import React from "react";
import { View, Text } from "react-native";
import MangaItem from "../collection/MangaItem";
import styles from "@/src/styles/styles";
import { ReadingListProps } from "@/src/types/manga";

const ReadingList = ({ mangas, onAddSession }: ReadingListProps) => {
  const unreadMangas = mangas.filter((manga) => !manga.isRead);

  return (
    <View>
      {unreadMangas.map((manga) => (
        <MangaItem
          key={manga.id}
          id={manga.id}
          title={manga.title}
          coverImage={manga.coverImage}
          isRead={manga.isRead}
          onPress={() => onAddSession(manga.title)}
          rightComponent={
            <View>
              <Text style={styles.addText}>+ Add Session</Text>
            </View>
          }
        />
      ))}
    </View>
  );
};

export default ReadingList;
