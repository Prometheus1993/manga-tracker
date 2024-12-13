/**
 * Hook voor het berekenen van serie statistieken.
 * Genereert leesvoortgang en volume informatie.
 */
import { useMemo } from "react";
import { SeriesOverview } from "@/src/types/manga";

 const useSeriesStats = (series: SeriesOverview) => {
  return useMemo(() => {
    const readPercentage = (series.readCount / series.volumes.length) * 100;

    return {
      readPercentage,
      ownedCount: series.volumes.length,
      totalVolumes: series.totalVolumes || "?",
      readCount: series.readCount,
    };
  }, [series]);
};

export default useSeriesStats;
