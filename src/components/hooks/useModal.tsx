import React, { useState } from 'react';

export const useModal = () => {
  const [currentId, setCurrentId] = useState<string>('');

  const setCurrentToDoId = (e: React.MouseEvent) => {
    const { id: selectedId } = e.currentTarget;
    setCurrentId(selectedId);
  };

  return {
    currentId,
    setCurrentToDoId,
  };
};
