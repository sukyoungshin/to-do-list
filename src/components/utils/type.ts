import { MouseEventHandler } from 'react';

export const defaultToDo = { id: '', todo: '', done: false };

export type AllToDos = ToDo[];
export type ToDo = { id: string; todo: string; done: boolean };

export type ModalComponentProps = {
  currentToDoId: string;
  allToDos: AllToDos;
  setAllToDos: (args: AllToDos) => void;
  closeModal: () => void;
};

export type TextButtonProps = {
  type: 'button' | 'submit';
  buttonType: 'edit' | 'deleteAll' | 'submit';
  onClick?: MouseEventHandler;
};

export type ButtonType = TextButtonProps['buttonType'];

export type SvgIconButtonProps = {
  type: 'button';
  size: 'half' | 'full';
  iconName: 'edit' | 'delete' | 'close';
  id?: string;
  onClick?: MouseEventHandler;
};

export type IconName = SvgIconButtonProps['iconName'];
