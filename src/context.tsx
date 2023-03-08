import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { UserContextType, UserContextTypeWithDispatch } from './interfaces';
import httpInstance from './services/axiosConfig';

export const UserContext = createContext<UserContextTypeWithDispatch>({
  userInfo: {
    id: 0,
    email: '',
    username: '',
    role: '',
  },
  setUserInfo: () => ({
    id: 0,
    email: '',
    username: '',
    role: '',
  }),
});

export default function UserInfoProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<UserContextType | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const result = await httpInstance.get('/auth/user', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods':
            'POST,PUT,PATCH,GET, DELETE,OPTIONS',
            'Access-Control-Allow-Headers':
            // eslint-disable-next-line max-len
            'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          },
        });
        setUserInfo(result.data);
      } catch (error) {
        setUserInfo(null);
      }
    };
    getUserInfo();
  }, []);
  const value = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo],
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
