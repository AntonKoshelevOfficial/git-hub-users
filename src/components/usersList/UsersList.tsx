import React, {
    useState,
    useEffect,
} from 'react';
import './usersList.scss';
import axios from 'axios';
import * as globalTypes from '../../constants/globalTypes';
import {
    useAppDispatch,
    useAppSelector,
} from '../../hooks/hooks';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as constants from '../../constants/constants';
import {
    sendGetRequest,
    getUserWithReposCountRequest,
} from '../../helpers/requestSender';
import {log} from "util";

const UsersList: React.FC = () => {
    const [ inputValue, setInputValue ] = useState<string>('');
    const users: globalTypes.UsersListItemType[] = useAppSelector(selectors.getUsers);
    const isOpenUserInfo: boolean = useAppSelector(selectors.getIsOpenUserInfo);
    const dispatchAction: (payload: globalTypes.ActionType) => void = useAppDispatch();

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    };
    const handleOnItemClick = (): void => {
        dispatchAction(actions.setIsOpenUserInfo(!isOpenUserInfo));
    };

    useEffect(() => {
        sendGetRequest(`${constants.GIT_HUB_API_URL}users?per_page=2`)
            .then(response => getUserWithReposCountRequest(response)
                .then(response => dispatchAction(actions.setUsers(response))));
    }, [])

    return (
        <div className={'userListWrapper'}>
            <h1 className={'userListTitle'}>GitHub Searcher</h1>
            <input
                type={'text'}
                value={inputValue}
                onChange={handleOnChange}
                className={'userSearch'}
                placeholder={'Search for Users'}
            />
            <div className={'usersList'}>
                {
                    users.map(item => (
                        <div
                            key={item.id}
                            onClick={handleOnItemClick}
                            className={'itemWrapper'}
                        >
                            <img
                                src={item.avatar_url}
                                alt={'avatar'}
                                className={'userImage'}
                            />
                            <div className={'userName'}>{item.login}</div>
                            <div className={'repositoriesCount'}>Repo: #{item.repos_count}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UsersList;