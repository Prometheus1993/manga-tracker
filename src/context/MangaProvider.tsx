/**
 * Context en Provider voor het centraal beheren van de manga collectie.
 * Verzorgt state management en communicatie met de mangaService.
 */
import React, { useState, useEffect } from "react";
import { Manga } from "@/src/types/manga";
import mangaService from "@/src/services/mangaService";
import feedbackService from "@/src/services/feedbackService";
import shareCollection from "@/src/utils/sharing";
import { MangaContext } from "./MangaContext";
import { MangaProviderProps } from "@/src/types/manga";

export const MangaProvider = ({ children }: MangaProviderProps) => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Laad manga's bij het opstarten van de app
  useEffect(() => {
    loadMangas();
  }, []);

  // Hoofdfuncties voor manga beheer
  const loadMangas = async () => {
    try {
      setIsLoading(true);
      const data = await mangaService.getMangaList();
      setMangas(data);
    } catch (error) {
      feedbackService.showError("Failed to load manga collection");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Voegt een nieuwe manga toe aan de collectie
   * en werkt de state bij na succesvolle toevoeging
   */
  const addManga = async (manga: Manga) => {
    try {
      const newManga = await mangaService.addManga(manga);
      setMangas([...mangas, newManga]);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Schakelt de gelezen status van een manga om
   * en synchroniseert dit met de service
   */
  const toggleRead = async (id: string) => {
    try {
      const manga = mangas.find((m) => m.id === id);
      if (!manga) return;

      const updatedManga = await mangaService.updateManga(id, {
        ...manga,
        isRead: !manga.isRead,
      });

      setMangas(mangas.map((m) => (m.id === id ? updatedManga : m)));
    } catch (error) {
      feedbackService.showError("Failed to update read status");
      throw error;
    }
  };

  // Bevestigingsdialoog voor het verwijderen van een manga
  const handleDelete = (id: string, title: string) => {
    feedbackService.showConfirmation({
      title: "Delete Manga",
      message: `Are you sure you want to delete "${title}"?`,
      onConfirm: async () => {
        await mangaService.deleteManga(id);
        setMangas(mangas.filter((manga) => manga.id !== id));
      },
    });
  };

  // Deelt de collectie via de sharing utility
  const handleShare = async () => {
    try {
      await shareCollection(mangas);
    } catch (error) {
      feedbackService.showError("Failed to share collection");
    }
  };

  /**
   * Berekent statistieken over de manga collectie
   * Inclusief totaal aantal, gelezen/ongelezen, en percentage
   */
  const getStats = () => {
    const total = mangas.length;
    const read = mangas.filter((m) => m.isRead).length;
    const unread = total - read;
    const readPercentage = total > 0 ? Math.round((read / total) * 100) : 0;

    return {
      total,
      read,
      unread,
      readPercentage,
    };
  };

  const reloadMangas = () => loadMangas();

  return (
    <MangaContext.Provider
      value={{
        mangas,
        isLoading,
        addManga,
        toggleRead,
        handleDelete,
        handleShare,
        getStats,
        reloadMangas,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};

