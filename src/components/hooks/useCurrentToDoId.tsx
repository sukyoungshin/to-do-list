import React, { useState } from 'react';

export const useCurrentToDoId = () => {
  const [currentToDoId, setCurrentToDoId] = useState<string>('');

  const updateCurrentToDoId = (e: React.MouseEvent) => {
    const { id: selectedId } = e.currentTarget;
    setCurrentToDoId(selectedId);
  };

  return {
    currentToDoId,
    updateCurrentToDoId,
  };
};
