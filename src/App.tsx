import React, { useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [todos, setTodos] = useState<any>([]);

  const [todo, setTodo] = useState<any>({});
  const addTodo = (e: any) => {
    const { value, name } = e.target;
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
    const { id, checked } = e.target;
    const currentTodo = todos.filter((todo: any) => (todo.id === id ? (todo.done = checked) : todo));

    setTodo(currentTodo);
  };

  const deleteTodo = (e: any) => {
    const { id } = e.target;
    setTodos(todos.filter((todolist: any) => todolist.id !== id));
  };
  const deleteAll = () => {
    const userConfirm = window.confirm('작성된 투두를 전부 삭제하시겠습니까?');
    if (!userConfirm) return;
    setTodos([]);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setTodos([...todos, todo]);
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
      <ToDoLists isVisible={todos.length > 0}>
        {todos.length > 0 &&
          todos.map((todolist: any) => {
            return (
              <ToDoList key={todolist.id}>
                <Checkbox type='checkbox' id={todolist.id} onChange={checkTodo} />
                <Span lineThrough={todolist.done}>{todolist['todo']}</Span>
                <ButtonWrapper>
                  <button type='button'>수정</button>
                  <button type='button' id={todolist.id} onClick={deleteTodo}>
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
          남은 할일: {todos.filter((todo: any) => todo.done === false).length} / 전체 할일: {todos.length}
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
