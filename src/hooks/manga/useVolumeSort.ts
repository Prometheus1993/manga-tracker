/**
 * Hook voor het sorteren van manga volumes op volumenummer.
 * Gebruikt memoization voor performance optimalisatie.
 */
import { useMemo } from "react";
import { Manga } from "@/src/types/manga";

const useVolumeSort = (volumes: Manga[]) => {
  return useMemo(() => {
    return volumes.sort((a, b) => a.volumeNumber - b.volumeNumber);
  }, [volumes]);
};

export default useVolumeSort;
