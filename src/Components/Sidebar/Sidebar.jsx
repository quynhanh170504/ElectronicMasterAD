import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router'
// icons
import { RiDashboardLine } from "react-icons/ri";
import { RiProductHuntLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import Logo from '~/assets/logo2.png';
// collapse
import { Collapse } from 'react-collapse';

function Sidebar() {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) setSubmenuIndex(null)
    else setSubmenuIndex(index)
  }
  return (
    <>
      <div className='dark:text-white dark:bg-gray-800 sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4'>
        <div className='py-2 w-full'>
          <Link to="/dashboard" className='flex items-center gap-2'>
            <img src={Logo} alt="logo" className='w-[120px]' />
            <p className='font-bold text-[#CC7861] text-2xl'>Electronic Master</p>
          </Link>

        </div>
        <ul className='mt-4'>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' component={Link} to="/dashboard">
              <RiDashboardLine className='text-[16px] dark:text-white' /><span className='dark:text-white '>Dashboard</span>
            </Button>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(1)}>
              <FaRegImage className='text-[16px] dark:text-white' /><span className='dark:text-white '>Home Slides</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all dark:text-white ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3'>
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='dark:text-white '>Home Banners List</span>
                  </Button>
                </li>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3'>
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='dark:text-white '>Home Banner Slide</span>
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' component={Link} to="/dashboard/users">
              <FaRegUserCircle className='text-[16px] dark:text-white' /><span className='dark:text-white '>Users</span>
            </Button>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(2)}>
              <RiProductHuntLine className='text-[16px] dark:text-white' /><span className='dark:text-white '>Products</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all dark:text-white ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 2 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/dashboard/products">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='dark:text-white '>Products List</span>
                  </Button>
                </li>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/dashboard/products/upload">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='dark:text-white '>Product Upload</span>
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          {/* <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(3)}>
              <BiCategoryAlt className='text-[16px] dark:text-white' /><span className='dark:text-white '>Category</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/categories">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='dark:text-white '>Category List</span>
                  </Button>
                </li>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/category/add">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    <span className='dark:text-white '>Add a Category</span>
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li> */}
          {/* <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' component={Link} to="/">
              <IoBagCheckOutline className='text-[16px] dark:text-white' /><span className='dark:text-white '>Orders</span>
            </Button>
          </li> */}
        </ul>
      </div>
    </>
  )
}

export default Sidebar