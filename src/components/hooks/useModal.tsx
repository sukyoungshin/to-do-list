import React, { useState } from 'react';
import { AllToDos, defaultToDo, ToDo } from 'components/utils/type';

export const useModal = (allToDos: AllToDos) => {
  const [currentTodo, setCurrentToDo] = useState('');
  const [currentTodoObj, setCurrentTodoObj] = useState<ToDo>({ ...defaultToDo });

  const modalHandler = (e: React.MouseEvent) => {
    const { id: selectedId } = e.currentTarget;
    const selectedToDo = allToDos.find((toDo) => toDo.id === selectedId);

    setCurrentToDo(selectedToDo?.todo ?? '');
    setCurrentTodoObj(selectedToDo ?? { ...defaultToDo });
  };

  return {
    modalHandler,
    setCurrentToDo,
    currentTodoObj,
    currentTodo,
  };
};
