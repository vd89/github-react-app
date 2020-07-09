import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import { SEARCH_USERS, SET_LOADING, GET_USER, GET_REPOS, CLEAR_USERS, ALL_USERS } from '../../types';


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



    //All USers in the Home Page
    const allUsers = async () => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`);
        dispatch({
            type: ALL_USERS,
            payload: res.data
        })
    }

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

    //Get Single User Method
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
        );

        dispatch({
            type: GET_USER,
            payload: res.data
        })

    };

    //Get User Repos
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${SECRET_KEY}`
        );
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    };
    //Clear Button Method
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
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
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers,
            allUsers
        }}>
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;