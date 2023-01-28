import { useState } from 'react';

export const useTodos = () => {
  const [allToDos, setAllToDos] = useState<any>([]);
  const restToDos = allToDos.filter((todo: any) => todo.done === false);

  const [todo, setTodo] = useState<any>({});
  const addTodo = (e: any) => {
    const { name, value } = e.target;
    const randomId = (Date.now() * Math.ceil(Math.random() * 2)).toString();

    setTodo({
      ...todo,
      id: randomId,
      [name]: value,
      done: false,
    });
  };

  const checkTodo = (e: any) => {
    const { id: selectedId, checked } = e.target;
    const toggleTodo = allToDos.filter((todo: any) => (todo.id === selectedId ? (todo.done = checked) : todo));

    setTodo(toggleTodo);
  };

  const deleteTodo = (e: any) => {
    const { id: selectedId } = e.target;
    const exceptSelectedToDo = allToDos.filter((toDo: any) => toDo.id !== selectedId);

    setAllToDos(exceptSelectedToDo);
  };
  const deleteAll = () => {
    if (allToDos.length === 0) return;

    const userConfirm = window.confirm('작성된 투두를 전부 삭제하시겠습니까?');
    if (!userConfirm) return;
    setAllToDos([]);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setAllToDos([...allToDos, todo]);
    setTodo({ id: '', todo: '', done: false }); // reset todo
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

export const useModal = (allToDos: any) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentTodo, setCurrentToDo] = useState('');
  const [currentTodoObj, setCurrentTodoObj] = useState<any>({});

  const modalHandler = (e: any) => {
    const { id: selectedId } = e.target;

    setModalShow(true);
    setCurrentToDo((allToDos.length > 0 && allToDos.find((toDo: any) => toDo.id === selectedId).todo) ?? '');
    setCurrentTodoObj(allToDos.length > 0 && allToDos.find((toDo: any) => toDo.id === selectedId));
  };

  return {
    modalHandler,
    setCurrentToDo,
    setModalShow,
    currentTodoObj,
    currentTodo,
    modalShow,
  };
};
