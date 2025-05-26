import { createRoot } from 'react-dom/client'
import '~/index.css'
import App from '~/App.jsx'
// components
import Header from '~/Components/Header/header.jsx';
import Sidebar from '~/Components/Sidebar/Sidebar.jsx';
// Pages
import Dashboard from '~/Pages/Dashboard/Dashboard.jsx';
import User from '~/Pages/User/User.jsx'
import Products from '~/Pages/Products/Products.jsx';
import ProductUpload from '~/Pages/Products/ProductUpload.jsx';
import ProductUpdate from '~/Pages/Products/ProductUpdate.jsx';
import ProductUploadSample from '~/Pages/Products/UploadSample.jsx';
import Login from '~/Pages/Login/Login.jsx';
//
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store.js'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <section className='main'>
        <Header />
        <div className='contentMain flex'>
          <div className='sidebarWrapper w-[18%] z-200'>
            <Sidebar />
          </div>
          <div className='contentRight px-4 py-14 w-[82%]'>
            <Outlet />
          </div>
        </div>
      </section>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "users",
        Component: User
      },
      {
        path: "products",
        children: [
          {
            index: true,
            Component: Products
          },
          {
            path: "upload",
            Component: ProductUpload
          }
        ]
      }
    ]
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/update",
    element: <ProductUpdate />
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
)
