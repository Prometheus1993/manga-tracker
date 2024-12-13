/**
 * Component voor het weergeven van een lijst van manga series.
 * Ondersteunt pull-to-refresh functionaliteit.
 */
import React from "react";
import { FlatList, RefreshControl } from "react-native";
import SeriesItem from "./SeriesItem";
import { SeriesListProps } from "@/src/types/manga";

const SeriesList = ({
  series,
  onSeriesPress,
  onRefresh,
  isLoading = false,
}: SeriesListProps) => {
  return (
    <FlatList
      data={series}
      keyExtractor={(item) => item.malId.toString()}
      renderItem={({ item }) => (
        <SeriesItem series={item} onPress={() => onSeriesPress(item.malId)} />
      )}
      refreshControl={
        onRefresh && (
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        )
      }
    />
  );
};

export default SeriesList;
