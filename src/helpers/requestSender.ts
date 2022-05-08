import axios from 'axios';
import * as globalTypes from './../constants/globalTypes';

export const sendGetRequest = async (path: string) => {
    return await axios.get(path, {
            'headers': {
                'Authorization': `token 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`,
            },
        })
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const getUsersRepositoriesRequest = async (array: Array<globalTypes.UsersListItemType>) => {
    let users: Array<globalTypes.UsersListItemType> = [];
    await Promise.all(array.map(item =>
        axios.get(`${item.repos_url}?per_page=100`, {
            'headers': {
                'Authorization': `token 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`,
            },
        })
            .then(response => {
                users.push({
                    ...item,
                    repos_list: response.data,
                    repos_count: response.data.length,
                });
            })
    ));

    return users;
};

