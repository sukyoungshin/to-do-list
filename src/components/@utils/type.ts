import { MouseEventHandler } from 'react';

export type AllToDos = ToDo[];
export type ToDo = { id: string; todo: string; done: boolean };

export type ModalComponentProps = {
  currentTodo: string;
  currentTodoObj: ToDo;
  setCurrentToDo: (args: string) => void;
  allToDos: AllToDos;
  setAllToDos: (args: AllToDos) => void;
  closeModal: () => void;
};

export type TextButtonProps = {
  type: 'button' | 'submit';
  buttonType: 'edit' | 'deleteAll' | 'submit';
  textMessage: string;
  onClick?: MouseEventHandler;
};

export type ButtonType = TextButtonProps['buttonType'];
// interface ExtendsButtonType extends Pick<TextButtonProps, 'buttonType'> {};

export type SvgIconButtonProps = {
  type: 'button';
  size: 'half' | 'full';
  iconName: 'edit' | 'delete' | 'close';
  id?: string;
  onClick?: MouseEventHandler;
};

export type IconName = SvgIconButtonProps['iconName'];