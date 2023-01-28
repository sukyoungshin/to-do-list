import { MouseEventHandler } from 'react';

export type AllToDos = ToDo[];
export type ToDo = { id: string; todo: string; done: boolean };

export type ModalComponentProps = {
  modalShow: boolean;
  setModalShow: (args: boolean) => void;
  currentTodo: string;
  currentTodoObj: ToDo;
  setCurrentToDo: (args: string) => void;
  allToDos: AllToDos;
  setAllToDos: (args: AllToDos) => void;
};

export type TextButtonProps = {
  type: 'button' | 'submit';
  buttonType: 'edit' | 'deleteAll' | 'submit' | undefined;
  textMessage: string;
  onClick?: (e: Event) => void;
};

export type SvgIconButtonProps = {
  type: 'button';
  size: 'half' | 'full';
  iconName: 'edit' | 'delete' | 'close';
  id?: string;
  onClick?: MouseEventHandler;
};
