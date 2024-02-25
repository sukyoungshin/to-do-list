import React, { useState } from 'react';
import { AllToDos, defaultToDo, ToDo } from 'components/utils/type';

export const useModal = (allToDos: AllToDos) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentTodo, setCurrentToDo] = useState('');
  const [currentTodoObj, setCurrentTodoObj] = useState<ToDo>({ ...defaultToDo });

  const openModal = () => setModalShow(true);
  const closeModal = () => setModalShow(false);
  const modalHandler = (e: React.MouseEvent) => {
    const { id: selectedId } = e.currentTarget;
    const selectedToDo = allToDos.find((toDo) => toDo.id === selectedId);

    openModal();
    setCurrentToDo(selectedToDo?.todo ?? '');
    setCurrentTodoObj(selectedToDo ?? { ...defaultToDo });
  };

  return {
    modalHandler,
    setCurrentToDo,
    currentTodoObj,
    currentTodo,
    modalShow,
    closeModal,
  };
};
