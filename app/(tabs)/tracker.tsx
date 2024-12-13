/**
 * Scherm voor het bijhouden van leesvoortgang.
 * Biedt functionaliteit voor dagelijkse herinneringen en leessessies.
 */
import React from "react";
import { View, Text, Switch, SectionList } from "react-native";
import styles from "@/src/styles/styles";
import useTracker from "@/src/hooks/features/useTracker";
import ReadingList from "@/src/components/features/manga/reading/ReadingList";

const TrackerScreen = () => {
  const {
    sectionsData,
    reminderEnabled,
    toggleReminder,
    handleAddSession,
    mangas,
  } = useTracker();

  const renderItem = ({
    section,
  }: {
    section: { type: string; title: string; subtitle?: string };
  }) => {
    if (section.type === "reminder") {
      return (
        <View style={styles.reminderRow}>
          <Text style={styles.reminderText}>Remind me daily at 8 PM</Text>
          <Switch value={reminderEnabled} onValueChange={toggleReminder} />
        </View>
      );
    }

    if (section.type === "reading") {
      return <ReadingList mangas={mangas} onAddSession={handleAddSession} />;
    }

    return null;
  };

  return (
    <SectionList
      sections={sectionsData}
      keyExtractor={(item, index) => index.toString()}
      renderSectionHeader={({ section }) => (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.subtitle && (
            <Text style={styles.description}>{section.subtitle}</Text>
          )}
        </View>
      )}
      renderItem={renderItem}
      stickySectionHeadersEnabled={false}
    />
  );
};

export default TrackerScreen;
