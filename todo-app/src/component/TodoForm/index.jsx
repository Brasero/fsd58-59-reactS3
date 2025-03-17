// path: todo-app/src/component/TodoForm/index.jsx
import "./style.scss";
import {useState} from "react";
import {useAddTodoMutation} from "../../store/slice/apiSlice.js";

const TodoForm = () => {
    
    const [todo, setTodo] = useState({
        title: ""
    })
	  const [addTodo, {isLoading}] = useAddTodoMutation()
    
    const handleChange = (e) => {
        const {value} = e.target
        setTodo({
            ...todo,
            title: value
        })
    }
		
		const handleSubmit = async (e) => {
			e.preventDefault()
			await addTodo({
				...todo,
				completed: 0
			})
			setTodo({
				...todo,
				title: ""
			})
		}
  
	return (
	 <form onSubmit={handleSubmit} className="TodoForm">
	  <input type={"text"} value={todo.title} onChange={handleChange} />
		 <input disabled={isLoading} type="submit" value="Ajouter" />
	 </form>
	)
}

export default TodoForm