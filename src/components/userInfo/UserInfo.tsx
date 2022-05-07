import React from 'react';
import './userInfo.scss';
import {
    useAppDispatch,
    useAppSelector,
} from '../../hooks/hooks';
import * as selectors from '../../store/selectors';
import * as globalTypes from '../../constants/globalTypes';
import * as actions from '../../store/actions';
import * as constants from '../../constants/constants';

const UserInfo: React.FC = () => {
    const isOpenUserInfo: boolean = useAppSelector(selectors.getIsOpenUserInfo);
    const dispatchAction: (payload: globalTypes.ActionType) => void = useAppDispatch();

    const handleOnItemClick = (): void => {
        dispatchAction(actions.setIsOpenUserInfo(!isOpenUserInfo));
    };

    return (
        <div className={'userInfoWrapper'}>
            <img
                src={constants.BACK_ARROW_ICON_URL}
                alt={'back'}
                onClick={handleOnItemClick}
                className={'backArrowImage'}
            />
            <h1 className={'userInfoTitle'}>GitHub Searcher</h1>
        </div>
    );
};

export default UserInfo;