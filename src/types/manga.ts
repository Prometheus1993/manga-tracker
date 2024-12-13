// app/types/manga.ts

import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";

/**
 * MyAnimeList (MAL) API gerelateerde types
 */
export interface MALMangaNode {
  id: number;
  title: string;
  main_picture?: {
    medium: string;
    large: string;
  };
  num_volumes?: number;
  status?: string;
}

export interface MALManga {
  node: MALMangaNode;
}

export interface MALResponse {
  data: MALManga[];
}

/**
 * Core manga types voor de applicatie
 */
export interface Manga {
  id: string;
  malId: number;
  title: string;
  coverImage: string;
  isRead: boolean;
  volumeNumber: number;
  totalVolumes?: number;
}

export interface SeriesOverview {
  malId: number;
  title: string;
  coverImage: string;
  volumes: Manga[];
  totalVolumes?: number;
  nextVolume?: number;
  readCount: number;
  nextVolumeToBuy?: number;
  nextVolumeToRead?: number;
}

/**
 * Context en state management types
 */
export interface MangaContextType {
  mangas: Manga[];
  isLoading: boolean;
  addManga: (manga: Manga) => Promise<void>;
  toggleRead: (id: string) => Promise<void>;
  handleDelete: (id: string, title: string) => void;
  handleShare: () => Promise<void>;
  getStats: () => {
    total: number;
    read: number;
    unread: number;
    readPercentage: number;
  };
  reloadMangas: () => Promise<void>;
}

export interface MangaProviderProps {
  children: React.ReactNode;
}

/**
 * UI Component Props
 */
// Algemene UI components
export interface SortButtonProps {
  onSort: () => void;
}

export interface ErrorMessageProps {
  message: string;
}

export interface SearchInputProps extends Omit<TextInputProps, "style"> {
  containerStyle?: object;
}

export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showActions?: boolean;
  primaryAction?: {
    label: string;
    onPress: () => void;
    onConfirm?: () => void;
    disabled?: boolean;
  };
}

// Manga lijst components
export interface MangaItemProps {
  id: string;
  title: string;
  coverImage: string;
  isRead?: boolean;
  onPress: () => void;
  rightComponent?: React.ReactNode;
}

export interface ReadingListProps {
  mangas: Manga[];
  onAddSession: (title: string) => Promise<void>;
}

export interface SeriesItemProps {
  series: SeriesOverview;
  onPress: () => void;
}

export interface SeriesListProps {
  series: SeriesOverview[];
  onSeriesPress: (malId: number) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

// Zoek components
export interface MangaSearchResultProps {
  manga: MALManga;
  onPress: () => void;
}

// Modal components
export interface AddVolumeModalProps {
  visible: boolean;
  onClose: () => void;
  malId: number;
  onAddVolume: (volume: Omit<Manga, "id">) => Promise<void>;
}

export interface SeriesHeaderProps {
  series: SeriesOverview;
  onClose: () => void;
}

export interface VolumeGridProps {
  volumes: Manga[];
  onVolumePress: (id: string) => void;
  onVolumeLongPress: (id: string, title: string) => void;
}

export interface VolumeSelectorProps {
  totalVolumes: number;
  selectedVolumes: number[];
  onVolumeToggle: (volume: number) => void;
  isOngoing: boolean;
  customVolumeCount: string;
  onCustomVolumeChange: (value: string) => void;
}

export interface MangaDetailModalProps {
  visible: boolean;
  onClose: () => void;
  manga: {
    node: MALMangaNode;
  };
  onAddVolumes: (volumeNumbers: number[]) => void;
}

/**
 * Locatie gerelateerde types
 */
export interface ReadingLocation {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface AddLocationModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onSave: () => Promise<void>;
}

export interface LocationDetailsModalProps {
  location: ReadingLocation | null;
  visible: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface FormattedReadingLocation extends ReadingLocation {
  formattedDate: string;
}

export interface LocationMapProps {
  locations: ReadingLocation[];
  onMarkerPress: (location: ReadingLocation) => void;
  mapRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export interface LocationListProps {
  locations: Array<ReadingLocation & { formattedDate: string }>;
  onLocationPress: (location: ReadingLocation) => void;
}

export interface LocationListItemProps {
  location: ReadingLocation & { formattedDate: string };
  onPress: () => void;
}

export interface AddButtonProps {
  onPress: () => void;
}

/**
 * Statistieken types
 */
export interface StatsDisplayProps {
  total: number;
  read: number;
  unread: number;
  readPercentage: number;
}

export interface StatsModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Actieknoppen types
 */
export interface ActionButtonsProps {
  onStatsPress: () => void; // Handler voor statistieken knop
  onSharePress: () => void; // Handler voor deel knop
}
