import React, { useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [allToDos, setAllToDos] = useState<any>([]);
  const restToDos = allToDos.filter((todo: any) => todo.done === false);

  const [todo, setTodo] = useState<any>({});
  const addTodo = (e: any) => {
    const { name, value } = e.target;
    if (value === '') return;

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
    const userConfirm = window.confirm('작성된 투두를 전부 삭제하시겠습니까?');
    if (!userConfirm) return;
    setAllToDos([]);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setAllToDos([...allToDos, todo]);
    setTodo({ id: '', todo: '', done: false }); // reset todo
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
                  <button type='button'>수정</button>
                  <button type='button' id={toDo.id} onClick={deleteTodo}>
                    삭제
                  </button>
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

const SubmitButton = styled.button`
  width: 80px;
  border: none;
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
  width: calc(100% - 110px);
  overflow: hidden;
  text-overflow: ellipsis;

  text-decoration: ${(props) => props.lineThrough && 'line-through green'};
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteAll = styled.button`
  margin-right: auto;
  width: 80px;
  height: 32px;
  border: 0;
`;
const Info = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;
