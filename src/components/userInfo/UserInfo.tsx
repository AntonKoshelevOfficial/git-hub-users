import React, {
    useMemo,
    useState,
    useEffect,
    useTransition,
} from 'react';
import './userInfo.scss';
import {
    useAppDispatch,
    useAppSelector,
} from '../../hooks/hooks';
import * as selectors from '../../store/selectors';
import * as globalTypes from '../../types/globalTypes';
import * as actions from '../../store/actions';
import * as constants from '../../constants/constants';
import { sendGetRequest } from '../../helpers/requestSender';
import { UserActionTypes } from '../../types/actionTypes';

const initialState = {
    id: 0,
    url: '',
    type: '',
    login: '',
    node_id: '',
    html_url: '',
    gists_url: '',
    repos_url: '',
    avatar_url: '',
    repos_list: [],
    site_admin: false,
    events_url: '',
    created_at: '',
    starred_url: '',
    gravatar_id: '',
    repos_count: 0,
    followers_url: '',
    following_url: '',
    subscriptions_url: '',
    organizations_url: '',
    received_events_url: '',
};

const UserInfo: React.FC = () => {
    const [ selectedUserDetailInfo, setSelectedUserDetailInfo ] = useState<globalTypes.UsersListItemType>(initialState);
    const [ inputValue, setInputValue ] = useState<string>('');
    const [ filteredValue, setFilteredValue ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const users: globalTypes.UsersListItemType[] = useAppSelector(selectors.getUsers);
    const isOpenUserInfo: boolean = useAppSelector(selectors.getIsOpenUserInfo);
    const selectedUserId: null | number = useAppSelector(selectors.getSelectedUserId);
    const dispatchAction: (payload: { payload: boolean; type: UserActionTypes }) => void = useAppDispatch();
    const selectedUserData: globalTypes.UsersListItemType = users.filter((user: globalTypes.UsersListItemType) => user.id === selectedUserId)?.[0];
    const [ isPending, startTransition ] = useTransition();

    const filteredRepos = useMemo(() => {
        return selectedUserData.repos_list?.filter((repo: globalTypes.ReposListType) => repo.name.toLocaleLowerCase().includes(filteredValue))
    }, [filteredValue])
    const handleOnArrowBackClick = (): void => {
        dispatchAction(actions.setIsOpenUserInfo(!isOpenUserInfo));
        dispatchAction(actions.setIsNeedLoadData(false))
    };
    const handleOnRepoItemClick = (repoUrl: string): void => {
        window.open(repoUrl, '_blank');
    }
    const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value)
        startTransition(() => {
            setFilteredValue(event.currentTarget.value)
        })
    }

    useEffect(() => {
        sendGetRequest(`${constants.GIT_HUB_API_URL}users/${selectedUserData.login}`)
            .then(response => {
                sendGetRequest(response.followers_url)
                    .then(followers => {
                        sendGetRequest(response.following_url.split('{')?.[0])
                            .then(following => {
                                setSelectedUserDetailInfo({
                                    ...response,
                                    created_at: new Date(response.created_at).toLocaleString(),
                                    followers_count: followers.length,
                                    following_count: following.length,
                                });
                                setIsLoading(false);
                            });
                    });
            });
    }, []);

    return (
        <div className={'userInfoWrapper'}>
            <img
                src={constants.BACK_ARROW_ICON_URL}
                alt={'back'}
                onClick={handleOnArrowBackClick}
                className={'backArrowImage'}
            />
            <h1 className={'userInfoTitle'}>GitHub Searcher</h1>
            {
                !isLoading
                    ? (<>
                        <div className={'userInfoMainData'}>
                            <div className={'userInfoImageContainer'}>
                                <img
                                    src={selectedUserDetailInfo.avatar_url}
                                    alt={'userInfoImage'}
                                    className={'userInfoImage'}
                                />
                            </div>
                            <div className={'userInfoDataContainer'}>
                                <div className={'userInfoName'}>
                                    {selectedUserDetailInfo.login}
                                </div>
                                <div className={'userInfoEmail'}>
                                    {selectedUserDetailInfo.email ?? ''}
                                </div>
                                <div className={'userInfoLocation'}>
                                    {selectedUserDetailInfo.location ?? ''}
                                </div>
                                <div className={'userInfoJoinDate'}>
                                    {selectedUserDetailInfo.created_at}
                                </div>
                                <div className={'userInfoFollowers'}>
                                    {selectedUserDetailInfo.followers_count} Followers
                                </div>
                                <div className={'userInfoFollowing'}>
                                    Following {selectedUserDetailInfo.following_count}
                                </div>
                            </div>
                        </div>
                        <div className={'userInfoBiography'}>
                            {selectedUserDetailInfo.bio}
                        </div>
                        <div className={'userInfoRepositoriesData'}>
                            <input
                                type={'text'}
                                value={inputValue}
                                onChange={handleOnChange}
                                className={'repositoriesSearch'}
                                placeholder={'Search for User Repositories'}
                            />
                            <div className={'repositoriesList'}>
                                {
                                    isPending
                                    || !filteredRepos?.length
                                        ? <div className={'pending'}>
                                            {isPending
                                                ? 'Pending...'
                                                : `No repository named "${inputValue}"`
                                            }
                                        </div>
                                        : filteredRepos.map((repo: globalTypes.ReposListType) => (
                                            <div
                                                key={repo.id}
                                                onClick={() => handleOnRepoItemClick(repo.html_url)}
                                                className={'repoItemWrapper'}
                                            >
                                                <div className={'repoName'}>{repo.name}</div>
                                                <div className={'repoInfo'}>
                                                    <div className={'repoForks'}>{repo.forks_count} Forks</div>
                                                    <div className={'repoStars'}>{repo.stargazers_count} Stars</div>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </>)
                    : <div className={'userInfoLoadingText'}> LOADING... </div>
            }
        </div>
    );
};

export default UserInfo;