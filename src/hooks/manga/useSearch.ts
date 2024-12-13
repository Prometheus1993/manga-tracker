/**
 * Hook voor het zoeken en toevoegen van manga's via de MAL API.
 * Beheert zoekresultaten en selectie van manga's.
 */
import { useState } from "react";
import useManga from "@/src/hooks/context/useManga";
import { MALManga } from "@/src/types/manga";
import searchService from "@/src/services/searchService";
import { createMangaFromMAL } from "@/src/utils/mangaHelpers";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MALManga[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedManga, setSelectedManga] = useState<MALManga | null>(null);
  const { addManga } = useManga();

  /**
   * Voert zoekopdracht uit en update resultaten
   */
  const handleSearch = async (text: string) => {
    try {
      setIsLoading(true);
      const searchResults = await searchService.searchManga(text);
      setResults(searchResults);
    } catch (error) {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMangaPress = (manga: MALManga) => {
    setSelectedManga(manga);
  };

  /**
   * Voegt meerdere volumes van geselecteerde manga toe
   */
  const handleAddVolumes = async (volumeNumbers: number[]) => {
    if (!selectedManga) return;

    try {
      await Promise.all(
        volumeNumbers.map((volumeNumber) => {
          const manga = createMangaFromMAL(selectedManga, volumeNumber);
          return addManga(manga);
        })
      );
      setSelectedManga(null);
    } catch (error) {
      // Error handling in addManga
    }
  };

  const closeModal = () => {
    setSelectedManga(null);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    selectedManga,
    handleSearch,
    handleMangaPress,
    handleAddVolumes,
    closeModal,
  };
};

export default useSearch;
