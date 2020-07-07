import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import { SEARCH_USERS, SET_LOADING } from '../../types';


const CLIENT_ID = 'c5868f39180303a9e8e4';
const SECRET_KEY = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search for github username string
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
        );
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    };


    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    return (
        <GithubContext.Provider value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers
        }}>
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;