/**
 * Helper functies voor manga-gerelateerde berekeningen en transformaties
 */
import { Manga, SeriesOverview, MALManga } from "@/src/types/manga";

/**
 * Zoekt het eerstvolgende ontbrekende volume in een serie
 */
const findNextVolumeToBuy = (
  ownedVolumes: number[],
  totalVolumes?: number
): number | undefined => {
  const maxVolume = totalVolumes || Math.max(...ownedVolumes);
  for (let i = 1; i <= maxVolume; i++) {
    if (!ownedVolumes.includes(i)) {
      return i;
    }
  }
  return undefined;
};

/**
 * Vindt het eerstvolgende ongelezen volume in numerieke volgorde
 */
const findNextVolumeToRead = (volumes: Manga[]): number | undefined => {
  const unreadVolumes = volumes
    .filter((v) => !v.isRead)
    .map((v) => v.volumeNumber)
    .sort((a, b) => a - b);

  return unreadVolumes.length > 0 ? unreadVolumes[0] : undefined;
};

/**
 * Groepeert manga volumes per serie en berekent serie-specifieke informatie
 */
export const groupMangasBySeries = (mangas: Manga[]): SeriesOverview[] => {
  const seriesMap = new Map<number, SeriesOverview>();

  mangas.forEach((manga) => {
    if (!seriesMap.has(manga.malId)) {
      const baseTitle = manga.title.replace(/\s+Vol\.\s+\d+$/, "");
      seriesMap.set(manga.malId, {
        malId: manga.malId,
        title: baseTitle,
        coverImage: manga.coverImage,
        volumes: [],
        totalVolumes: manga.totalVolumes,
        readCount: 0,
        nextVolumeToBuy: undefined,
        nextVolumeToRead: undefined,
      });
    }

    const series = seriesMap.get(manga.malId)!;
    series.volumes.push(manga);
    if (manga.isRead) series.readCount++;
  });

  seriesMap.forEach((series) => {
    const ownedVolumes = series.volumes
      .map((v) => v.volumeNumber)
      .sort((a, b) => a - b);
    series.nextVolumeToBuy = findNextVolumeToBuy(
      ownedVolumes,
      series.totalVolumes
    );
    series.nextVolumeToRead = findNextVolumeToRead(series.volumes);
  });

  return Array.from(seriesMap.values());
};

/**
 * Zet MAL manga data om naar ons interne Manga formaat
 */
export const createMangaFromMAL = (
  malManga: MALManga,
  volumeNumber: number
): Manga => ({
  id: `${malManga.node.id}_vol${volumeNumber}`,
  malId: malManga.node.id,
  title: `${malManga.node.title} Vol. ${volumeNumber}`,
  coverImage:
    malManga.node.main_picture?.medium ||
    "https://via.placeholder.com/128x128.png?text=No+Image",
  isRead: false,
  volumeNumber,
  totalVolumes: malManga.node.num_volumes,
});
