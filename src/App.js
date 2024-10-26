import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import { routes } from'./routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import 'antd'
import axios from 'axios'
export function App() {
  useEffect(() => {
    fetchApi();
}, []);

const fetchApi = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/get-all`);
    console.log('res', res);
};

  return (
    <div>
      
      <Router>
        <Routes>
          {routes.map((route) =>{
            const Page = route.page
            const Layout=  route.isShowHeader ? DefaultComponent :Fragment
            return (
              <Route key={route.path} path={route.path} element ={
                <Layout>
                  <Page/>
                </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}
export default App