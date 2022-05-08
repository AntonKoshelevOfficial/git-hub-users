import React, {useState, useEffect} from 'react';
import './userInfo.scss';
import {
    useAppDispatch,
    useAppSelector,
} from '../../hooks/hooks';
import * as selectors from '../../store/selectors';
import * as globalTypes from '../../constants/globalTypes';
import * as actions from '../../store/actions';
import * as constants from '../../constants/constants';
import {sendGetRequest} from '../../helpers/requestSender';

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
    repos_list: '',
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
    const [selectedUserDetailInfo, setSelectedUserDetailInfo] = useState<globalTypes.UsersListItemType>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const users: globalTypes.UsersListItemType[] = useAppSelector(selectors.getUsers);
    const isOpenUserInfo: boolean = useAppSelector(selectors.getIsOpenUserInfo);
    const selectedUserId: number = useAppSelector(selectors.getSelectedUserId);
    const dispatchAction: (payload: globalTypes.ActionType) => void = useAppDispatch();
    const selectedUserData: globalTypes.UsersListItemType = users.filter((user: globalTypes.UsersListItemType) => user.id === selectedUserId)?.[0]

    const handleOnItemClick = (): void => {
        dispatchAction(actions.setIsOpenUserInfo(!isOpenUserInfo));
        dispatchAction(actions.setIsNeedLoadData(false))
    };

    useEffect(() => {
        sendGetRequest(`${constants.GIT_HUB_API_URL}users/${selectedUserData.login}`)
            .then(response => {
                sendGetRequest(response.followers_url)
                    .then(followers => {
                        sendGetRequest(response.following_url.split('{')?.[0])
                            .then(following => {
                                setSelectedUserDetailInfo({
                                    ...selectedUserData,
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
                onClick={handleOnItemClick}
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
                                    {selectedUserDetailInfo.followers_count}
                                </div>
                                <div className={'userInfoFollowing'}>
                                    {selectedUserDetailInfo.following_count}
                                </div>
                            </div>
                        </div>
                        <div className={'userInfoBiography'}>
                            {selectedUserDetailInfo.bio}
                        </div>
                        <div className={'userInfoRepositoriesData'}>

                        </div>
                    </>)
                    : <div className={'userInfoLoadingText'}> LOADING... </div>
            }
        </div>
    );
};

export default UserInfo;