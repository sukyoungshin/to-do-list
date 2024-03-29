import styled from 'styled-components';
import { useTodos } from './hooks/useTodos';
import { COLORS, FONTSIZE } from 'components/utils/style-util';
import { ModalComponent } from './modal';
import { TextButton, SvgIconButton } from './button';
import { useCurrentToDoId } from './hooks/useCurrentToDoId';
import { useModalHandler } from './hooks/useModalHandler';

const App = () => {
  const { addTodo, checkTodo, deleteTodo, deleteAll, submitHandler, allToDos, setAllToDos, todo } = useTodos();

  const { currentToDoId, updateCurrentToDoId } = useCurrentToDoId();
  const { modalShow, openModal, closeModal } = useModalHandler();

  // 전체 투두 갯수
  const allToDosCount = allToDos.length;
  // 남은 투두 갯수
  const restToDosCount = allToDos.filter((todo) => !todo.done).length;

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
          allToDos.map(({ id, todo, done }) => {
            return (
              <ToDoList key={id}>
                <Checkbox type='checkbox' id={id} checked={done} onChange={checkTodo} />
                <Text>{todo}</Text>
                <Buttons>
                  <SvgIconButton
                    type='button'
                    id={id}
                    size='half'
                    iconName='edit'
                    onClick={(e) => {
                      openModal();
                      updateCurrentToDoId(e);
                    }}
                  />
                  <SvgIconButton type='button' id={id} size='half' iconName='delete' onClick={deleteTodo} />
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
          남은 할 일: {restToDosCount} / 전체 할 일: {allToDosCount}
        </Count>
      </CountWrapper>
      {modalShow && (
        <ModalComponent
          currentToDoId={currentToDoId}
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
