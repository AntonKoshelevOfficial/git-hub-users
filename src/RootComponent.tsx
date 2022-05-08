import React from 'react';
import './rootComponent.scss';
import UserInfo from './components/userInfo/UserInfo';
import UsersList from './components/usersList/UsersList';
import * as selectors from './store/selectors';
import { useAppSelector } from './hooks/hooks';

const RootComponent: React.FC = () => {
    const isOpenUserInfo: boolean = useAppSelector(selectors.getIsOpenUserInfo);

    return (
      <div className={'wrapper'}>
        {
          isOpenUserInfo
              ? <UserInfo/>
              : <UsersList/>
        }
      </div>
    );
}

export default RootComponent;
