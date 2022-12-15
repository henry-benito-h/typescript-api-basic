export default {
    LIST_USERS: '/api/users',
    SINGLE_USER: (id: number) => `/api/users/${id}`,
    CREATE_USER: '/api/users',
    PUT_USER: (id: number) => `/api/users/${id}`,
    DELETE_USER: (id: number) => `/api/users/${id}`,
};