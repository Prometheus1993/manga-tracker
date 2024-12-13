/**
 * Hook voor het beheren en weergeven van de manga collectie.
 * Biedt zoek- en filteropties en navigatiefunctionaliteit.
 */
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import useManga from "@/src/hooks/context/useManga";
import { groupMangasBySeries } from "@/src/utils/mangaHelpers";

const useCollection = () => {
  const { mangas, handleShare, isLoading, reloadMangas } = useManga();
  const [statsVisible, setStatsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const hasMangas = mangas.length > 0;

  // Filter series op basis van zoekopdracht
  const filteredSeries = useMemo(() => {
    const seriesList = groupMangasBySeries(mangas);
    return searchQuery
      ? seriesList.filter((series) =>
          series.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : seriesList;
  }, [mangas, searchQuery]);

  // Navigeer naar serie details
  const handleSeriesPress = (malId: number) => {
    router.push(`/series/${malId}`);
  };

  const toggleStatsModal = () => {
    setStatsVisible(!statsVisible);
  };

  return {
    filteredSeries,
    isLoading,
    searchQuery,
    setSearchQuery,
    statsVisible,
    handleSeriesPress,
    toggleStatsModal,
    handleShare,
    reloadMangas,
    hasMangas,
  };
};

export default useCollection;
