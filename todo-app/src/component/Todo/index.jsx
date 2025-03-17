// path: todo-app/src/component/Todo/index.jsx
import "./style.scss";
import {useCompleteTodoMutation, useDeleteTodoMutation} from "../../store/slice/apiSlice.js";

const Todo = ({id, title, completed, refetch}) => {
	
	const [completeTodo, {isLoading}] = useCompleteTodoMutation()
	const [deleteTodo, {isLoading: isDeleting}] = useDeleteTodoMutation()
	
	const handleChange = async () => {
		await completeTodo({
			id,
			title,
			completed: !completed
		})
		//refetch()
	}
	
	const handleDelete = () => {
		deleteTodo(id)
	}
	
	return (
	 <div className="Todo">
	  <span>{title}</span>
		 <span>
			 <input
			  type={"checkbox"}
			  checked={completed}
			  disabled={isLoading}
			  onChange={handleChange}
			 />
		 </span>
		 <button
		  disabled={isDeleting}
		  onClick={handleDelete}
		 >X</button>
	 </div>
	)
}

export default Todo