import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/userSlice.js';
//icons
import { RiMenu2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import avatar from '~/assets/default_avatar.jpg';
//badge
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
// menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
//
import Switch from '@mui/material/Switch';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  console.log("check user: ", user)
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const handleLogOut = () => {
    dispatch(logout())
    navigate('/')
  }

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
    const html = document.documentElement
    html.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className='w-full h-[auto] py-2 pl-74 shadow-md pr-7 bg-[#f1f1f1] border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between fixed z-100 dark:bg-[#1e1e2f] dark:border-[rgba(255,255,255,0.1)]'>
      <div className='part1'>

      </div>
      <div className='part2 flex items-center justify-end gap-4'>
        <div className='relative'>
          <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer' onClick={handleClickMyAcc}>
            <img
              src={user?.avatar?.url === '' ? avatar : user?.avatar?.url} alt="avartar" className='w-full h-full object-cover' />
          </div>
          <Menu
            anchorEl={anchorMyAcc}
            id="account-menu"
            open={openMyAcc}
            onClose={handleCloseMyAcc}
            onClick={handleCloseMyAcc}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer' onClick={handleClickMyAcc}>
                  <img src={user?.avatar?.url === '' ? avatar : user?.avatar?.url} alt="avartar" className='w-full h-full object-cover' />
                </div>
                <div className='info'>
                  <h3 className='text-[15px] font-[500] leading-5'>{user?.username}</h3>
                  <p className='text-[12px] font-[400] opacity-75'>{user?.email}</p>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut} className='flex items-center gap-3'>
              <IoIosLogOut /><span>Log out</span>
            </MenuItem>
          </Menu>
        </div>
        <Switch
          checked={theme === 'dark' ? true : false}
          onChange={toggleTheme}
        />
      </div>
    </header>
  )
}

export default Header