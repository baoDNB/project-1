import React, { Fragment, useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import { routes } from'./routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import 'antd'
import { isJsonString } from './utils'
import { jwtDecode }   from "jwt-decode";
import * as UserService from './services/UserService'
import { updateUser } from './redux/silces/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './components/LoadingComponent/Loading'




function App() {
  const dispatch = useDispatch();
  const[isLoading, setIsLoading]= useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { storageData, decoded } = handleDecoded();
      if (decoded?.id) {
        try {
          await handleGetDetailsUser(decoded.id, storageData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, []);
  
  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      try {
        decoded = jwtDecode(storageData);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return { decoded, storageData };
  };
  
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date().getTime() / 1000;
      const { decoded } = handleDecoded();
  
      if (decoded?.exp < currentTime) {
        try {
          const data = await UserService.refreshToken();
          config.headers['token'] = `Bearer ${data?.access_token}`;
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return Promise.reject(error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      throw error;  
    }
  };
  
  return (
    <div>
      <Loading isLoading={isLoading}>
      <Router>
        <Routes>
          {routes.map((route) =>{
            const Page = route.page
            const ischeckAuth= !route.isPrivate  || user.isAdmin
            const Layout=  route.isShowHeader ? DefaultComponent :Fragment
            return (
              <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={          
              <Layout>
                  <Page/>
                </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
      </Loading>
      </div>
  )
}
export default App