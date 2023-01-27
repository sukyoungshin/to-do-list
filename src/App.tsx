import React, { useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [todos, setTodos] = useState<any>([]);

  const [todo, setTodo] = useState<any>({});
  const addTodo = (e: any) => {
    const { value, name } = e.target;
    const randomId = (Date.now() * Math.ceil(Math.random() * 2)).toString();

    setTodo({
      ...todo,
      id: randomId,
      [name]: value,
      done: false,
    });
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
      <ToDoLists>
        {todos.length > 0 &&
          todos.map((todolist: any) => {
            return (
              <ToDoList key={todolist.id}>
                <input type='checkbox' />
                <span>{todolist['todo']}</span>
                <ButtonWrapper>
                  <button type='button'>수정</button>
                  <button type='button'>삭제</button>
                </ButtonWrapper>
              </ToDoList>
            );
          })}
      </ToDoLists>
      <div>
        <button type='button'>전체삭제</button>
      </div>
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
  width: calc(100% - 80px);
  border: none;
`;

const SubmitButton = styled.button`
  width: 80px;
  border: none;
`;

const ToDoLists = styled.ul`
  padding: 0;
  list-style: none;

  max-height: 500px;
  overflow-y: auto;
  scrollbar-gutter: auto;

  box-shadow: 0px 0px 2px rgb(0 0 0 / 10%);
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

const ButtonWrapper = styled.div`
  margin-left: auto;
`;
