/**
 * Hook voor het beheren van manga series.
 * Biedt functionaliteit voor volume validatie en serie beheer.
 */
import { useState } from "react";
import useManga from "@/src/hooks/context/useManga";
import { groupMangasBySeries } from "@/src/utils/mangaHelpers";

const useSeries = (malId: number) => {
  const { mangas, toggleRead, handleDelete, addManga } = useManga();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const seriesList = groupMangasBySeries(mangas);
  const series = seriesList.find((s) => s.malId === malId);

  /**
   * Valideert volume nummer voor toevoeging
   * Controleert op duplicaten en serie limieten
   */
  const validateVolumeNumber = (volumeNumber: number) => {
    if (!volumeNumber || volumeNumber <= 0) {
      return { isValid: false, error: "Please enter a valid volume number" };
    }
    if (series?.volumes.some((v) => v.volumeNumber === volumeNumber)) {
      return {
        isValid: false,
        error: `Volume ${volumeNumber} is already in your collection`,
      };
    }
    if (series?.totalVolumes && volumeNumber > series.totalVolumes) {
      return {
        isValid: false,
        error: `This series only has ${series.totalVolumes} volumes`,
      };
    }
    return { isValid: true };
  };

  /**
   * Vindt overgeslagen volumes tot aan doelvolume
   */
  const getSkippedVolumes = (targetVolume: number) => {
    if (!series) return [];
    const existingVolumes = series.volumes
      .map((v) => v.volumeNumber)
      .sort((a, b) => a - b);
    const skippedVolumes = [];
    for (let i = 1; i < targetVolume; i++) {
      if (!existingVolumes.includes(i)) {
        skippedVolumes.push(i);
      }
    }
    return skippedVolumes;
  };

  return {
    series,
    toggleRead,
    handleDelete,
    addManga,
    addModalVisible,
    setAddModalVisible,
    validateVolumeNumber,
    getSkippedVolumes,
  };
};

export default useSeries;
