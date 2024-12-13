// app/styles/styles.ts
import { StyleSheet } from "react-native";

// Constanten voor consistentie
const COLORS = {
  primary: "#007AFF",
  error: "#FF3B30",
  success: "#4CAF50",
  background: "#f5f5f5",
  white: "white",
  text: {
    primary: "#333",
    secondary: "#666",
    light: "#888",
  },
  border: "#ddd",
};

const SHADOWS = {
  default: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
};

const styles = StyleSheet.create({
  // Layout & Containers
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Empty States
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text.secondary,
  },
  emptySubText: {
    fontSize: 16,
    color: COLORS.text.light,
    marginTop: 8,
  },

  // List styles
  list: {
    padding: 8,
  },

  // Manga item styles
  mangaItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...SHADOWS.default,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  readBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  readText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  // Search styles
  input: {
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    marginBottom: 16,
    ...SHADOWS.default,
  },
  searchResult: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...SHADOWS.default,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  addText: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
  },

  // Tracker styles
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.default,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
  },
  reminderRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 16,
  },
  reminderText: {
    fontSize: 16,
  },

  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    fontSize: 16,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
    marginLeft: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: COLORS.error,
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  modalButtonDisabled: {
    backgroundColor: "#ccc",
  },

  // Stats styles
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  percentageContainer: {
    marginBottom: 20,
  },
  percentageText: {
    fontSize: 16,
    color: COLORS.text.primary,
  },

  // Button styles
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  // FAB styles
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.default,
  },
  addFab: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },

  // Volume selector styles
  volumeSelector: {
    maxHeight: 50,
    marginBottom: 16,
  },
  volumeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  volumeButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  volumeButtonText: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  volumeButtonTextSelected: {
    color: COLORS.white,
  },
  volumeInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 60,
    textAlign: "center",
  },
  volumeInputInSeries: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
    width: "100%",
    fontSize: 16,
  },

  // Series styles
  seriesItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...SHADOWS.default,
  },
  seriesHeader: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  seriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 16,
  },
  stat: {
    flexDirection: "column",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  nextVolume: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  nextVolumeText: {
    fontSize: 14,
    color: COLORS.primary,
  },

  // Volume grid styles
  volumeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 16,
  },
  volumeCard: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.default,
  },
  volumeCardRead: {
    backgroundColor: "#f0f8ff",
    borderColor: COLORS.success,
  },
  volumeNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text.primary,
    textAlign: "center",
  },
  readIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  // Progress bar
  progressBar: {
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  // Search specific
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  searchInput: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    ...SHADOWS.default,
  },

  // Reading list
  readingListItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.default,
  },
  readingListContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Custom volume input
  customVolumeInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },

  // Header button
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    ...SHADOWS.default,
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  map: {
    height: 300,
    width: "100%",
    marginBottom: 16,
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    ...SHADOWS.default,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  locationDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  locationDate: {
    fontSize: 12,
    color: COLORS.text.light,
    marginTop: 4,
    marginBottom: 8,
  },
  detailMap: {
    height: 200,
    width: "100%",
    marginVertical: 16,
    borderRadius: 12,
  },
  locationModalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
locationModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
},
locationModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
},
locationModalDescription: {
    fontSize: 16,
    marginBottom: 12,
},
locationModalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
},
locationModalDeleteButton: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
},
locationModalDeleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
},

  resultsContainer: {
    flex: 1,
    width: "100%",
  },

});

export default styles;
