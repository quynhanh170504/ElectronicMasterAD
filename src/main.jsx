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
//
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
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
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
