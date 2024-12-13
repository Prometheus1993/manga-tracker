/**
 * Service voor het beheren van de manga collectie
 * Handelt API communicatie en lokale opslag af
 */
import { API_CONFIG } from "./api";
import { storage } from "@/src/utils/storage";
import { Manga } from "@/src/types/manga";
import feedbackService from "./feedbackService";

/**
 * Haalt de manga lijst op, met fallback naar lokale opslag
 */
const getMangaList = async (): Promise<Manga[]> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.endpoints.manga}`
    );
    const data: Manga[] = await response.json();
    await storage.set("MANGA_LIST", data);
    return data;
  } catch (error) {
    console.error("Error fetching manga list:", error);
    feedbackService.showError("Failed to load manga list");
    const savedData = await storage.get<Manga[]>("MANGA_LIST");
    return savedData ?? [];
  }
};

/**
 * Voegt nieuwe manga toe met duplicaat controle
 */
const addManga = async (manga: Manga): Promise<Manga> => {
  const currentList = await getMangaList();

  if (currentList.some((item) => item.id === manga.id)) {
    feedbackService.showError(
      `Volume ${manga.volumeNumber} already exists in collection`
    );
    throw new Error(
      `Volume ${manga.volumeNumber} already exists in collection`
    );
  }

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.endpoints.manga}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(manga),
    }
  );

  const newManga = await response.json();
  await storage.set("MANGA_LIST", [...currentList, newManga]);
  return newManga;
};

/**
 * Werkt bestaande manga bij en synchroniseert met lokale opslag
 */
const updateManga = async (
  id: string,
  updates: Partial<Manga>
): Promise<Manga> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.endpoints.manga}/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );

    const updatedManga = await response.json();
    const currentList = await getMangaList();
    const newList = currentList.map((manga) =>
      manga.id === id ? updatedManga : manga
    );
    await storage.set("MANGA_LIST", newList);

    return updatedManga;
  } catch (error) {
    feedbackService.showError("Failed to update manga");
    throw error;
  }
};

/**
 * Verwijdert manga en update lokale opslag
 */
const deleteManga = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.endpoints.manga}/${id}`, {
      method: "DELETE",
    });

    const currentList = await getMangaList();
    const newList = currentList.filter((manga) => manga.id !== id);
    await storage.set("MANGA_LIST", newList);
  } catch (error) {
    feedbackService.showError("Failed to delete manga");
    throw error;
  }
};

export default {
  getMangaList,
  addManga,
  updateManga,
  deleteManga,
};
