import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import authApi from "./api/authApi";
import { checkProfile } from './stores/global/globalSlice'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './scss/style.scss'
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const dispatch = useDispatch();
  const [isFetch, setFetch] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (token) await dispatch(checkProfile());

      setFetch(true);
      console.log("isfect ",isFetch )
    };

    checkLogin();
  }, []);

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        {isFetch && (
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="*" name="Admin" element={<DefaultLayout />} />

          </Routes>
        )}
      </Suspense>
    </HashRouter>
  )

}

export default App
