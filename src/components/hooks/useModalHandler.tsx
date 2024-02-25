import { useState } from 'react';

export const useModalHandler = () => {
  const [modalShow, setModalShow] = useState(false);
  const openModal = () => setModalShow(true);
  const closeModal = () => setModalShow(false);

  return {
    modalShow,
    openModal,
    closeModal,
  };
};
