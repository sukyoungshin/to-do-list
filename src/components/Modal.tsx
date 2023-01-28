import { createPortal } from 'react-dom';
import { COLORS } from 'style-util';
import styled from 'styled-components';
import SvgIconButton from './button/svg-icon-button';
import TextButton from './button/text-button';

type Props = {
  modalShow: boolean;
  setModalShow: (args: boolean) => void;
  currentTodo: string;
  currentTodoObj: any;
  setCurrentToDo: (args: string) => void;
  allToDos: Array<Object>;
  setAllToDos: (args: any) => void;
};

const ModalComponent = ({
  modalShow,
  setModalShow,
  currentTodo,
  currentTodoObj,
  setCurrentToDo,
  allToDos,
  setAllToDos,
}: Props) => {
  const updateTodo = (e: any) => {
    e.preventDefault();
    const newTodo = { ...currentTodoObj, todo: currentTodo };
    const exclude = allToDos.filter((toDo: any) => toDo.id !== currentTodoObj.id);

    setAllToDos([newTodo, ...exclude]);
    setModalShow(false);
  };

  return (
    <>
      {createPortal(
        <Background isVisible={modalShow}>
          <Modal>
            <SvgIconButton type='button' size='full' iconName='close' onClick={() => setModalShow(false)} />
            <TextArea
              placeholder='수정할 투두 내용을 입력하세요. 최대 입력글자는 50글자 입니다.'
              value={currentTodo}
              onChange={(e: any) => setCurrentToDo(e.target.value)}
              maxLength={50}
              autoFocus
              required
            />
            <TextButton type='button' buttonType='edit' textMessage='수정' onClick={updateTodo} />
          </Modal>
        </Background>,
        document.body
      )}
    </>
  );
};

export default ModalComponent;

const Background = styled.div<{
  isVisible: boolean;
}>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};

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
  height: 200px;
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

  resize: none;
  box-sizing: border-box;
`;
