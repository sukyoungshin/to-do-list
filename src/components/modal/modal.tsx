import React from 'react';
import { createPortal } from 'react-dom';
import { COLORS } from 'components/utils/style-util';
import styled from 'styled-components';
import { ModalComponentProps } from 'components/utils/type';
import { TextButton, SvgIconButton } from '../button';

const ModalComponent = ({
  currentTodo,
  currentTodoObj,
  setCurrentToDo,
  allToDos,
  setAllToDos,
  closeModal,
}: ModalComponentProps) => {
  const updateToDo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentToDo(e.target.value);
  };
  const submitToDo = (e: React.MouseEvent) => {
    e.preventDefault();
    const newTodo = { ...currentTodoObj, todo: currentTodo };
    const updateToDos = allToDos.map((toDo) => (toDo.id === newTodo.id ? (toDo = newTodo) : toDo));

    setAllToDos([...updateToDos]);
    closeModal();
  };

  return (
    <>
      {createPortal(
        <Background onClick={closeModal}>
          <Modal>
            <SvgIconButton type='button' size='full' iconName='close' onClick={closeModal} />
            <TextArea
              placeholder='수정할 투두 내용을 입력하세요. 최대 입력글자는 50글자 입니다.'
              value={currentTodo}
              onChange={updateToDo}
              maxLength={50}
              autoFocus
              required
            />
            <TextButton type='button' buttonType='edit' onClick={submitToDo}>
              수정
            </TextButton>
          </Modal>
        </Background>,
        document.body
      )}
    </>
  );
};

export default ModalComponent;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.dimBackground};

  position: absolute;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  padding: 16px;
  width: 500px;
  background-color: ${COLORS.white};
  border-radius: 8px;

  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
`;

const TextArea = styled.textarea`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  height: 100px;
`;
