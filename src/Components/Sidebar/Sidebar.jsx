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
      <div className='sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4'>
        <div className='py-2 w-full'>
          <Link to="/">
            <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" alt="logo" className='w-[120px]' />
          </Link>
        </div>
        <ul className='mt-4'>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' component={Link} to="/">
              <RiDashboardLine className='text-[16px]' />Dashboard
            </Button>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(1)}>
              <FaRegImage className='text-[16px]' />Home Slides
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3'>
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    Home Banners List
                  </Button>
                </li>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3'>
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' component={Link} to="/users">
              <FaRegUserCircle className='text-[16px]' />Users
            </Button>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(2)}>
              <RiProductHuntLine className='text-[16px]' />Products
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 2 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/products">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    Products List
                  </Button>
                </li>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/products/upload">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    Product Upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' onClick={() => isOpenSubMenu(3)}>
              <BiCategoryAlt className='text-[16px]' />Category
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/categories">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    Category List
                  </Button>
                </li>
                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.8)] !font-semibold !capitalize !justify-start w-full !text-[13px] !font-[400] !pl-9 flex gap-3' component={Link} to="/category/add">
                    <span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>
                    Add a Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Button className='!w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]' component={Link} to="/">
              <IoBagCheckOutline className='text-[16px]' />Orders
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar