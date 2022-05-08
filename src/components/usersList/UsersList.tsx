import React, {
    useState,
    useEffect,
} from 'react';
import './usersList.scss';
import * as globalTypes from '../../types/globalTypes';
import {
    useAppDispatch,
    useAppSelector,
} from '../../hooks/hooks';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as constants from '../../constants/constants';
import {
    sendGetRequest,
    getUsersRepositoriesRequest,
} from '../../helpers/requestSender';
import { useDebounce } from 'use-debounce';
import { UserActionTypes } from '../../types/actionTypes';

const UsersList: React.FC = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const users: globalTypes.UsersListItemType[] = useAppSelector(selectors.getUsers);
    const isOpenUserInfo: boolean = useAppSelector(selectors.getIsOpenUserInfo);
    const isNeedLoadData: boolean = useAppSelector(selectors.getIsNeedLoadData);
    const userListSearchInputValue: string = useAppSelector(selectors.getUserListSearchValue);
    const dispatchAction: (payload: { payload: any; type: UserActionTypes }) => void = useAppDispatch();
    const [ value ] = useDebounce<string>(userListSearchInputValue, 500)

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        dispatchAction(actions.setUserListSearchInputValue(event.currentTarget.value));
    };
    const handleOnItemClick = (userId: number): void => {
        dispatchAction(actions.setIsOpenUserInfo(!isOpenUserInfo));
        dispatchAction(actions.setSelectedUserId(userId));
    };

    useEffect(() => {
        if (isNeedLoadData) {
            setIsLoading(true)

            if (!value.length) {
                sendGetRequest(`${constants.GIT_HUB_API_URL}users`)
                    .then((response: globalTypes.UsersListItemType[]) => getUsersRepositoriesRequest(response)
                        .then((response: globalTypes.UsersListItemType[]) => {
                            dispatchAction(actions.setUsers(response))
                            setIsLoading(false)
                        }));
            } else {
                sendGetRequest(`${constants.GIT_HUB_API_URL}search/users?q=${value}&page=1`)
                    .then((response: any) => getUsersRepositoriesRequest(response?.items)
                        .then((response: globalTypes.UsersListItemType[]) => {
                            dispatchAction(actions.setUsers(response))
                            setIsLoading(false)
                        }));
            }
        } else {
            dispatchAction(actions.setIsNeedLoadData(true))
            setIsLoading(false)
        }
    }, [value])

    return (
        <div className={'userListWrapper'}>
            <h1 className={'userListTitle'}>GitHub Searcher</h1>
            <input
                type={'text'}
                value={userListSearchInputValue}
                onChange={handleOnChange}
                className={'userSearch'}
                placeholder={'Search for Users'}
            />
            {
                !isLoading
                    ? <div className={'usersList'}>
                {
                    users.map(item => (
                        <div
                            key={item.id}
                            onClick={(): void => handleOnItemClick(item.id)}
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
                : <div className={'userListLoadingText'}> LOADING... </div>
            }
        </div>
    );
};

export default UsersList;