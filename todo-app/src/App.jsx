import './App.css'
import {useGetTodosQuery} from "./store/slice/apiSlice.js";
import Todo from "./component/Todo/index.jsx";
import TodoForm from "./component/TodoForm/index.jsx";

function App() {
  
  const {
    data: todos,
   isLoading,
   isSuccess,
   isError,
   error,
   refetch
  } = useGetTodosQuery()

  
  let content;
  if (isLoading) content = <div>Chargement...</div>
  if (isError) content = <div>Erreur: {error.error}</div>
  if (isSuccess) content = <div>{
    todos.map((todo) => <Todo refetch={refetch} key={todo.id} {...todo} />)
  }</div>
  
  return (
    <>
      {content}
      <TodoForm />
    </>
  )
}

export default App