/**
 * Hoofdscherm voor de manga collectie.
 * Toont lijst van series met zoek- en filterfunctionaliteit.
 */
import React from "react";
import { View } from "react-native";
import styles from "@/src/styles/styles";
import LoadingSpinner from "@/src/components/ui/feedback/LoadingSpinner";
import EmptyState from "@/src/components/features/manga/ui/feedback/EmptyState";
import StatsModal from "@/src/components/features/manga/stats/modals/StatsModal";
import SeriesList from "@/src/components/features/manga/series/list/SeriesList";
import SearchInput from "@/src/components/ui/input/SearchInput";
import ActionButtons from "@/src/components/features/manga/ui/buttons/ActionButtons";
import useCollection from "@/src/hooks/manga/useCollection";

const CollectionScreen = () => {
  const {
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
  } = useCollection();

  if (isLoading) return <LoadingSpinner />;
  if (!hasMangas) return <EmptyState />;

  return (
    <View style={styles.container}>
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search series..."
      />

      <SeriesList
        series={filteredSeries}
        onSeriesPress={handleSeriesPress}
        onRefresh={reloadMangas}
        isLoading={isLoading}
      />

      <ActionButtons
        onStatsPress={toggleStatsModal}
        onSharePress={handleShare}
      />

      <StatsModal visible={statsVisible} onClose={toggleStatsModal} />
    </View>
  );
};

export default CollectionScreen;
