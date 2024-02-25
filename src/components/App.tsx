import styled from 'styled-components';
import { useModal, useTodos } from './@hooks/hooks';
import { COLORS, FONTSIZE } from 'components/@utils/style-util';
import { ModalComponent } from './modal';
import { TextButton, SvgIconButton } from './button';

const App = () => {
  const { addTodo, checkTodo, deleteTodo, deleteAll, submitHandler, allToDos, setAllToDos, restToDos, todo } =
    useTodos();
  const { modalHandler, setCurrentToDo, closeModal, currentTodoObj, currentTodo, modalShow } = useModal(allToDos);

  return (
    <Container>
      <Title>To Do List</Title>
      <ToDoForm onSubmit={submitHandler}>
        <ToDoInput
          type='text'
          placeholder='할 일을 적으세요'
          name='todo'
          value={todo.todo}
          onChange={addTodo}
          maxLength={50}
          autoFocus
          required
        />
        <TextButton type='submit' buttonType='submit'>
          등록
        </TextButton>
      </ToDoForm>
      <ToDoLists isVisible={allToDos.length > 0}>
        {allToDos.length > 0 &&
          allToDos.map((toDo) => {
            return (
              <ToDoList key={toDo.id}>
                <Checkbox type='checkbox' id={toDo.id} checked={toDo.done} onChange={checkTodo} />
                <Text>{toDo.todo}</Text>
                <Buttons>
                  <SvgIconButton type='button' id={toDo.id} size='half' iconName='edit' onClick={modalHandler} />
                  <SvgIconButton type='button' id={toDo.id} size='half' iconName='delete' onClick={deleteTodo} />
                </Buttons>
              </ToDoList>
            );
          })}
      </ToDoLists>
      <CountWrapper>
        <TextButton type='button' buttonType='deleteAll' onClick={deleteAll}>
          전체 삭제
        </TextButton>
        <Count>
          남은 할 일: {restToDos.length} / 전체 할 일: {allToDos.length}
        </Count>
      </CountWrapper>
      {modalShow && (
        <ModalComponent
          currentTodo={currentTodo}
          setCurrentToDo={setCurrentToDo}
          currentTodoObj={currentTodoObj}
          allToDos={allToDos}
          setAllToDos={setAllToDos}
          closeModal={closeModal}
        />
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
  flex: 1;
`;

const ToDoLists = styled.ul<{
  isVisible: boolean;
}>`
  ${({ isVisible }) =>
    isVisible &&
    `
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
    background-color: ${COLORS.dimBackground};
  }
`;
const Checkbox = styled.input<{
  checked: boolean;
}>`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: ${COLORS.hightLight};

  &:checked ~ span {
    text-decoration: ${({ checked }) => checked && `line-through ${COLORS.hightLight}`};
  }
`;
const Text = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Buttons = styled.div`
  margin-left: auto;
  width: 80px;
`;

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  font-size: ${FONTSIZE.small};
  color: ${COLORS.grey};
`;
