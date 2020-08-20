const extend = (a, b) => Object.assign({}, a, b);
const initialState = {
    users: [{
        id: 1,
        name: `John`,
        role: `admin`,
    },
    {
        id: 2,
        name: `Ivan`,
        role: `user`,
    },
        {
        id: 3,
        name: `Steve`,
        role: `guest`,
        }
    ],
    isLoadForm: false,
    userId: 0,
};
const ActionType = {
    LOAD_USER: `LOAD_USER`,
    EDIT_USER: `EDIT_USER`,
    LOAD_FORM: `LOAD_FORM`,
    POST_USER: `POST_USER`,
    DELETE_USER: `DELETE_USER`,
};
const ActionCreator = {
    loadUsers: (users) => ({
        type: ActionType.LOAD_USER,
        payload: users,
    }),
    loadForm: (user) => ({
        type: ActionType.LOAD_FORM,
        payload: user,
    }),
    editUsers: (userId, userData) =>({
        type: ActionType.EDIT_USER,
        payload: [userId, userData],
    }),
    postUsers: (userData) =>({
        type: ActionType.POST_USER,
        payload: userData,
    }),
    deleteUser: (userID) =>({
        type: ActionType.DELETE_USER,
        payload: userID,
    })
};
const Operations = {
    loadUsers: () => (dispatch, getState, api) => {
        return api.get(`/users`)
            .then((responce) => {
                dispatch(ActionCreator.loadUsers(responce.data));
            })
            .catch((err) => {
                throw err;
            });
    },
    editUsers: (userData, userId) => (dispatch, getState, api) => {
        return api.post(`/users/${userId}`, {
            name: userData.name,
            role: userData.role,
        })
            .then((response) => {
                dispatch(Operations.loadUsers());
            })
            .catch((err) => {
                dispatch(ActionCreator.editUsers(userId, userData));
                throw err;
            });
    },
    postUsers: (userData) => (dispatch, getState, api) => {
        return api.post(`/users`, {
            id: userData.id,
            name: userData.name,
            role: userData.role,
        })
            .then((response) => {
                dispatch(Operations.loadUsers());
            })
            .catch((err) => {
                dispatch(ActionCreator.postUsers(userData));
                throw err;
            });
    },
    deleteUser: (userId) => (dispatch, getState, api) => {
        return api.delete(`/users/${userId}`)
            .then((response) => {
                dispatch(Operations.loadUsers());
            })
            .catch((err) => {
                dispatch(ActionCreator.deleteUser(userId));
                throw err;
            });
    }
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LOAD_USER:
            return extend(state, {
                //users: action.payload,
            });
        case ActionType.LOAD_FORM:
            return extend(state, {
                userId: action.payload,
                isLoadForm: true,
            });
        case ActionType.EDIT_USER:
            state.users[action.payload[1]-1] = action.payload[0]
            return extend(state, {
                isLoadForm: false
            });
        case ActionType.POST_USER:
            state.users.push(action.payload)
            return extend(state, {
                isLoadForm: false
            });
        case ActionType.DELETE_USER:
            const newUser = state.users.filter((it) => it.id !== Number(action.payload))
            return extend(state, {
                users: newUser
            });
    }
    return state;
};
export {ActionType, ActionCreator, initialState, Operations, reducer};
