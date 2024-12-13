/**
 * Custom hook voor toegang tot de manga context binnen de applicatie.
 * Biedt toegang tot alle manga-gerelateerde state en functies.
 *
 * @throws Error wanneer gebruikt buiten de MangaProvider
 */
import { useContext } from "react";
import { MangaContext } from "@/src/context/MangaContext";
import { MangaContextType } from "@/src/types/manga";

const useManga = () => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error("useManga moet binnen een MangaProvider gebruikt worden");
  }
  return context as MangaContextType;
};

export default useManga;
