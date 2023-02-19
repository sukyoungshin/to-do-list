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
        <TextButton type='submit' buttonType='submit' textMessage='등록' />
      </ToDoForm>
      <ToDoLists isVisible={allToDos.length > 0}>
        {allToDos.length > 0 &&
          allToDos.map((toDo) => {
            return (
              <ToDoList key={toDo.id}>
                <Checkbox type='checkbox' id={toDo.id} checked={toDo.done} onChange={checkTodo} />
                <Span lineThrough={toDo.done}>{toDo.todo}</Span>
                <Buttons>
                  <SvgIconButton type='button' id={toDo.id} size='half' iconName='edit' onClick={modalHandler} />
                  <SvgIconButton type='button' id={toDo.id} size='half' iconName='delete' onClick={deleteTodo} />
                </Buttons>
              </ToDoList>
            );
          })}
      </ToDoLists>
      <CountWrapper>
        <TextButton type='button' buttonType='deleteAll' textMessage='전체 삭제' onClick={deleteAll} />
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
  width: calc(100% - 80px);
  border: none;
`;

const ToDoLists = styled.ul<{
  isVisible: boolean;
}>`
  ${({ isVisible }) =>
    isVisible &&
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
    background-color: ${COLORS.dimBackground};
  }
`;
const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: ${COLORS.hightLight};
`;
const Span = styled.span<{
  lineThrough: boolean;
}>`
  width: calc(100% - 112px);
  overflow: hidden;
  text-overflow: ellipsis;

  text-decoration: ${({ lineThrough }) => lineThrough && `line-through ${COLORS.hightLight}`};
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
  color: rgba(0, 0, 0, 0.5);
`;
