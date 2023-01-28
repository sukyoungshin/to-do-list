import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';

const App = () => {
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

  const [modalShow, setModalShow] = useState(false);
  const [currentTodo, setCurrentToDo] = useState('');
  const [currentTodoObj, setCurrentTodoObj] = useState<any>({});
  const modalHandler = (e: any) => {
    const { id: selectedId } = e.target;

    setModalShow(true); // 모달 오픈
    setCurrentToDo((allToDos.length > 0 && allToDos.find((o: any) => o.id === selectedId).todo) ?? '');
    setCurrentTodoObj(allToDos.length > 0 && allToDos.find((o: any) => o.id === selectedId));
  };

  const updateTodo = (e: any) => {
    e.preventDefault();
    const newTodo = { ...currentTodoObj, todo: currentTodo };
    const exclude = allToDos.filter((o: any) => o.id !== currentTodoObj.id);

    setAllToDos([newTodo, ...exclude]);
    setModalShow(false);
  };

  return (
    <Container>
      <Title>To Do List</Title>
      <ToDoForm onSubmit={submitHandler}>
        <ToDoInput
          type='text'
          placeholder='할 일을 적으세요'
          name='todo'
          value={todo['todo']}
          onChange={addTodo}
          maxLength={50}
          autoFocus
          required
        />
        <SubmitButton type='submit'>등록</SubmitButton>
      </ToDoForm>
      <ToDoLists isVisible={allToDos.length > 0}>
        {allToDos.length > 0 &&
          allToDos.map((toDo: any) => {
            return (
              <ToDoList key={toDo.id}>
                <Checkbox type='checkbox' id={toDo.id} onChange={checkTodo} />
                <Span lineThrough={toDo.done}>{toDo['todo']}</Span>
                <ButtonWrapper>
                  <HalfButton type='button' id={toDo.id} onClick={modalHandler}>
                    <AiOutlineEdit />
                  </HalfButton>
                  <HalfButton type='button' id={toDo.id} onClick={deleteTodo}>
                    <AiOutlineDelete />
                  </HalfButton>
                </ButtonWrapper>
              </ToDoList>
            );
          })}
      </ToDoLists>
      <InfoWrapper>
        <DeleteAll type='button' onClick={deleteAll}>
          전체삭제
        </DeleteAll>
        <Info>
          남은 할 일: {restToDos.length} / 전체 할 일: {allToDos.length}
        </Info>
      </InfoWrapper>
      {/* 포탈 */}
      {createPortal(
        <ModalBackground isVisible={modalShow}>
          <Modal>
            <CloseButton type='button' onClick={() => setModalShow(false)}>
              <AiOutlineClose />
            </CloseButton>
            <TextArea
              placeholder='수정할 투두 내용을 입력하세요. 최대 입력글자는 50글자 입니다.'
              value={currentTodo}
              onChange={(e: any) => setCurrentToDo(e.target.value)}
              maxLength={50}
              autoFocus
              required
            />
            <UpdateButton type='button' onClick={updateTodo}>
              수정
            </UpdateButton>
          </Modal>
        </ModalBackground>,
        document.body
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  margin: 0 auto;
  width: 500px;
`;
const Title = styled.h1`
  text-align: center;
`;

const ToDoForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;

  height: 32px;
  box-shadow: 0px 0px 2px rgb(0 0 0 / 10%);
`;

const ToDoInput = styled.input`
  padding-left: 8px;
  width: calc(100% - 80px);
  border: none;
`;

const DefaultButton = styled.button`
  height: 32px;
  border: none;
  border-radius: 4px;

  & > svg {
    pointer-events: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const HalfButton = styled(DefaultButton)`
  width: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
`;

const SubmitButton = styled(DefaultButton)`
  width: 80px;
`;

const ToDoLists = styled.ul<{
  isVisible: boolean;
}>`
  ${(props) =>
    props.isVisible &&
    `
      padding: 0;
      list-style: none;

      max-height: 500px;
      overflow-y: auto;
      scrollbar-gutter: auto;

      box-shadow: 0px 0px 2px rgb(0 0 0 / 10%);
  `}
`;

const ToDoList = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 32px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: green;
`;
const Span = styled.span<{
  lineThrough: boolean;
}>`
  width: calc(100% - 112px);
  overflow: hidden;
  text-overflow: ellipsis;

  text-decoration: ${(props) => props.lineThrough && 'line-through green'};
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  width: 80px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteAll = styled(DefaultButton)`
  margin-right: auto;
  width: 80px;
`;
const Info = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const ModalBackground = styled.div<{
  isVisible: boolean;
}>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);

  position: absolute;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  padding: 16px;
  width: 500px;
  height: 200px;
  background-color: white;
  border-radius: 8px;

  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
`;

const CloseButton = styled(DefaultButton)`
  display: block;
  margin-left: auto;
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  height: 100px;

  resize: none;
  box-sizing: border-box;
`;

const UpdateButton = styled(DefaultButton)`
  width: 100%;
`;
