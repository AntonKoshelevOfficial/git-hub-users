import React, { useState, useCallback }  from 'react';
import './rootComponent.scss';
import UserInfo from './components/userInfo/UserInfo';
import UsersList from './components/usersList/UsersList';

const RootComponent: React.FC = () => {
  const [isOpenUserInfo, setIsOpenUserInfo] = useState<boolean>(false);
  const handleOnItemClick = useCallback(() => {
      setIsOpenUserInfo(!isOpenUserInfo);
  }, [])

  return (
      <div className={'wrapper'}>
        {
          isOpenUserInfo
              ? <UserInfo/>
              : <UsersList handleOnItemClick={handleOnItemClick}/>
        }
      </div>
  );
}

export default RootComponent;
