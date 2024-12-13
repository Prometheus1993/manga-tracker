/**
 * Hoofdcomponent voor het weergeven van de manga collectie.
 * Toont laad states, lege states en de lijst van manga's.
 */
import React from "react";
import { FlatList } from "react-native";
import useManga from "@/src/hooks/context/useManga";
import styles from "@/src/styles/styles";
import MangaItem from "./MangaItem";
import LoadingSpinner from "@/src/components/ui/feedback/LoadingSpinner";
import EmptyState from "@/src/components/features/manga/ui/feedback/EmptyState";
import type { Manga } from "@/src/types/manga";

const MangaList = () => {
  const { mangas, isLoading, toggleRead } = useManga();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (mangas.length === 0) {
    return <EmptyState />;
  }

  const renderItem = ({ item }: { item: Manga }) => (
    <MangaItem
      id={item.id}
      title={item.title}
      coverImage={item.coverImage}
      isRead={item.isRead}
      onPress={() => toggleRead(item.id)}
    />
  );

  return (
    <FlatList
      data={mangas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

export default MangaList;
