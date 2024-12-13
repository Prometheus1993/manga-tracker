// src/contexts/manga/MangaContext.ts
import { createContext } from 'react';
import { MangaContextType } from '@/src/types/manga';

export const MangaContext = createContext<MangaContextType | null>(null);