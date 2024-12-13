/**
 * Hook voor het weergeven en beheren van serie details.
 * Integreert navigatie en serie beheer functionaliteit.
 */
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "expo-router";
import useManga from "@/src/hooks/context/useManga";
import { groupMangasBySeries } from "@/src/utils/mangaHelpers";
import { Manga } from "@/src/types/manga";

type NewManga = Omit<Manga, "id">;

const useSeriesDetail = (id: string | string[] | undefined) => {
  const router = useRouter();
  const { mangas, toggleRead, handleDelete, addManga } = useManga();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const malId = Number(Array.isArray(id) ? id[0] : id);

  // Zoek serie details
  const series = useMemo(() => {
    const seriesList = groupMangasBySeries(mangas);
    return seriesList.find((s) => s.malId === malId);
  }, [mangas, malId]);

  // Navigeer terug als serie niet bestaat
  useEffect(() => {
    if (!series || series.volumes.length === 0) {
      router.back();
    }
  }, [series, router]);

  /**
   * Voegt nieuw volume toe aan serie
   */
  const handleAddVolume = async (manga: NewManga) => {
    await addManga({
      ...manga,
      id: `${manga.malId}_vol${manga.volumeNumber}`,
    });
  };

  const toggleAddModal = () => {
    setAddModalVisible(!addModalVisible);
  };

  const handleClose = () => {
    router.back();
  };

  return {
    series,
    addModalVisible,
    toggleAddModal,
    handleClose,
    toggleRead,
    handleDelete,
    handleAddVolume,
    malId,
  };
};

export default useSeriesDetail;
