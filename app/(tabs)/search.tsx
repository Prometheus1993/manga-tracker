/**
 * Zoekscherm voor het vinden van nieuwe manga's via de MAL API.
 * Toont zoekresultaten en biedt mogelijkheid om volumes toe te voegen.
 */
import React from "react";
import { View, FlatList } from "react-native";
import styles from "@/src/styles/styles";
import LoadingSpinner from "@/src/components/ui/feedback/LoadingSpinner";
import MangaDetailModal from "@/src/components/features/manga/volumes/modals/AddVolumeModal";
import SearchInput from "@/src/components/ui/input/SearchInput";
import MangaSearchResult from "@/src/components/features/manga/search/MangaSearchResult";
import useSearch from "@/src/hooks/manga/useSearch";

const SearchScreen = () => {
  const {
    query,
    setQuery,
    results,
    isLoading,
    selectedManga,
    handleSearch,
    handleMangaPress,
    handleAddVolumes,
    closeModal,
  } = useSearch();

  return (
    <View style={styles.container}>
      {/* Zoekbalk */}
      <SearchInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => handleSearch(query)}
        placeholder="Search manga..."
      />

      <View style={styles.resultsContainer}>
        {/* Laad indicator of zoekresultaten */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.node.id.toString()}
            renderItem={({ item }) => (
              <MangaSearchResult
                manga={item}
                onPress={() => handleMangaPress(item)}
              />
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      {/* Modal voor het toevoegen van volumes */}
      {selectedManga && (
        <MangaDetailModal
          visible={true}
          manga={selectedManga}
          onClose={closeModal}
          onAddVolumes={handleAddVolumes}
        />
      )}
    </View>
  );
};

export default SearchScreen;
