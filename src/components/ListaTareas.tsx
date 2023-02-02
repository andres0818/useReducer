import React, { useReducer, useRef, RefObject } from 'react';

interface Task {
  id: number;
  title: string;
}

interface Action {
  type: string;
  title?: string;
  index?: number;
}

const ListaTareas = () => {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const [tasks, dispatch] = useReducer((state: Task[], action: Action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return [
          ...state,
          { id: state.length, title: action.title as string },
        ];
      case 'REMOVE_TASK':
        return state.filter((task, index) => index !== (action.index as number));
      default:
        return state;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TASK',
      title: inputRef.current?.value,
    });
    inputRef.current && (inputRef.current.value = '');
  };

  return (
    <div>
      <h1>Lista de tareas</h1>
      <form onSubmit={handleSubmit}>
        <label>Tarea</label>
        <input type="text" name="title" ref={inputRef} />
        <input type="submit" value="Enviar" />
      </form>
      <div className="tasks">
        {tasks.map((task: Task, index: number) => (
          <div key={index}>
            <p>{task.title}</p>
            <button onClick={() => dispatch({ type: 'REMOVE_TASK', index })}>
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTareas;