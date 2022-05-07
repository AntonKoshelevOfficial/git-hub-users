import axios from 'axios';
import * as globalTypes from './../constants/globalTypes';

export const sendGetRequest = async (path: string) => {
    return await axios.get(path)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const getUserWithReposCountRequest = async (array: Array<globalTypes.UsersListItemType>) => {
    let users: Array<globalTypes.UsersListItemType> = [];
    await Promise.all(array.map(item =>
        axios.get(`${item.repos_url}?per_page=100`)
            .then(response => {
            users.push({
                ...item,
                repos_count: response.data.length
            });
        })
    ));

    return users;
};

