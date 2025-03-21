import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["Pastries", "Auth"],
    baseQuery: fetchBaseQuery({ baseUrl: `${ import.meta.env.VITE_API_BASE }` }),
    endpoints: (builder) => ({
        /* Pastries */

        // Récupère toutes les patisseries
        getPastries: builder.query({
            query: () => '/game/pastries',
            providesTags: ['Pastries'],
        }),

        // Gagne des patisseries et retourne la liste des patisseries gagnées
        winPastries: builder.mutation({
            query: (quantity) => ({
                url: `/game/win-pastries/${quantity}`,
                method: 'GET',
            }),
            invalidatesTags: ['Pastries'],
        }),


        /* Auth */
        checkIsConnected: builder.query({
            query: () => ({
                url: '/me',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),

        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: {
                    email: email,
                    password: password
                },

                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',

                // need to pass credentials
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),

        /* CRUD */
        getPastrieById: builder.query({
            query: (pastrieId) => ({
                url: `/api/pastrie/${pastrieId}`,
                method: 'GET',

                // need to pass credentials
                credentials: 'include',
            }),
            providesTags: ['Pastries'],
        }),

        createPastrie: builder.mutation({
            query: (pastrie) => ({
                url: '/api/pastrie',
                method: 'POST',
                body: pastrie,

                // need to pass credentials
                credentials: 'include',
            }),
            invalidatesTags: ['Pastries'],
        }),

        deletePastrie: builder.mutation({
            query: (pastrieId) => ({
                url: `/api/pastrie/${pastrieId}`,
                method: 'DELETE',

                // need to pass credentials
                credentials: 'include',
            }),
            invalidatesTags: ['Pastries'],
        }),

        updatePastrie: builder.mutation({
            query: (pastrie) => ({
                url: `/api/pastrie/${pastrie.id}`,
                method: 'PUT',
                body: pastrie,

                // need to pass credentials
                credentials: 'include',
            }),
            invalidatesTags: ['Pastries'],
        }),
    })
})

export const {
    useGetPastriesQuery,
    useWinPastriesMutation,
    useCheckIsConnectedQuery,
    useLoginMutation,
    useLogoutMutation,
    useCreatePastrieMutation,
    useDeletePastrieMutation,
    useUpdatePastrieMutation,
    useGetPastrieByIdQuery,
} = apiSlice