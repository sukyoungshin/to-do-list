import React, { FormEvent, useState } from 'react';
import { AllToDos, defaultToDo, ToDo } from 'components/@utils/type';

export const useTodos = () => {
  const [allToDos, setAllToDos] = useState<AllToDos>([]);
  const restToDos = allToDos.filter((todo) => todo.done === false);

  const [todo, setTodo] = useState<ToDo>({ ...defaultToDo });
  const addTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const randomId = (Date.now() * Math.ceil(Math.random() * 2)).toString();

    setTodo({
      ...todo,
      id: randomId,
      [name]: value,
    });
  };

  const checkTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: selectedId, checked } = e.currentTarget;
    const tempAllToDos = allToDos.map((toDo) =>
      toDo.id === selectedId
        ? {
            ...toDo,
            done: checked,
          }
        : toDo
    );
    setAllToDos(tempAllToDos);
  };

  const deleteTodo = (e: React.MouseEvent) => {
    const { id: selectedId } = e.currentTarget;
    const exceptSelectedToDo = allToDos.filter((toDo) => toDo.id !== selectedId);

    setAllToDos(exceptSelectedToDo);
  };
  const deleteAll = () => {
    if (allToDos.length === 0) return;

    const userConfirm = window.confirm('작성된 투두를 전부 삭제하시겠습니까?');
    if (!userConfirm) return;
    setAllToDos([]);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setAllToDos([...allToDos, todo]);
    setTodo({ ...defaultToDo });
  };

  return {
    addTodo,
    checkTodo,
    deleteTodo,
    deleteAll,
    submitHandler,
    allToDos,
    setAllToDos,
    restToDos,
    todo,
  };
};

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
