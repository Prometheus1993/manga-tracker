/**
 * Functionaliteit voor het delen van de manga collectie
 * Genereert een tekst bestand met collectie overzicht
 */
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import type { Manga } from "@/src/types/manga";

const shareCollection = async (mangas: Manga[]) => {
  const fileUri = FileSystem.cacheDirectory + "manga-collection.txt";

  try {
    const readCount = mangas.filter((m) => m.isRead).length;
    const text =
      `My Manga Collection:\n\n` +
      `Total: ${mangas.length} mangas\n` +
      `Read: ${readCount}\n` +
      `Unread: ${mangas.length - readCount}\n\n` +
      `Manga List:\n` +
      mangas
        .map((m) => `- ${m.title} (${m.isRead ? "Read ✓" : "Unread"})`)
        .join("\n");

    await FileSystem.writeAsStringAsync(fileUri, text);

    await Sharing.shareAsync(fileUri, {
      mimeType: "text/plain",
      dialogTitle: "Share Manga Collection",
    });

    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  } catch (error) {
    throw error;
  }
};

export default shareCollection;
