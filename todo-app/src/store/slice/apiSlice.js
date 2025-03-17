import {createSlice} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "todo",
	tagTypes: ["Todos"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001/api/tasks"
	}),
	endpoints: (build) => {
		return {
			getTodos: build.query({
				query: () => "/",
				providesTags: ['Todos']
			}),
			completeTodo: build.mutation({
				query: (todo) => {
					return {
						url: `/${todo.id}`,
						method: "PATCH",
						body: todo
					}
				},
				invalidatesTags: ["Todos"]
			}),
			deleteTodo: build.mutation({
				query: (id) => ({
					url: `/${id}`,
					method: "DELETE"
				}),
				invalidatesTags: ['Todos']
			}),
			addTodo: build.mutation({
				query: (todo) => ({
					query: "/",
					method: "POST",
					body: todo
				}),
				invalidatesTags: ["Todos"]
			})
		}
	}
})

export const {
	useGetTodosQuery,
 useCompleteTodoMutation,
 useDeleteTodoMutation,
 useAddTodoMutation
} = apiSlice