import * as actionType from '../Actions/actionTypes';
import { updateObject } from '../Utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/' 
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken, 
        userId: action.userId,
        error: null,
        loading: false
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAILED: return authFailed(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;