/**
 * Modal voor het tonen van collectie statistieken.
 * Haalt data op via MangaContext en toont via StatsDisplay.
 */
import React from "react";
import useManga from "@/src/hooks/context/useManga";
import StatsDisplay from "../StatsDisplay";
import BaseModal from "@/src/components/ui/BaseModal";
import { StatsModalProps } from "@/src/types/manga";

const StatsModal = ({ visible, onClose }: StatsModalProps) => {
  const { getStats } = useManga();
  const stats = getStats();

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Collection Statistics"
      showActions
    >
      <StatsDisplay
        total={stats.total}
        read={stats.read}
        unread={stats.unread}
        readPercentage={stats.readPercentage}
      />
    </BaseModal>
  );
};

export default StatsModal;
