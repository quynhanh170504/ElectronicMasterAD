import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
// Icons
import { FaGift } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { GiPieChart } from "react-icons/gi";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";


const DashboardBoxes = ({ NewOrders = 0, TodayRevenue = 0, TotalRevenue = 0, TotalProduct = 0 }) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className='box p-5 cursor-pointer rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <FaGift className='text-[30px] text-[#3872fa]' />
            <div className='info w-[70%]'>
              <h3>News Orders</h3>
              <b>{NewOrders}</b>
            </div>
            <IoStatsChartSharp className='text-[50px] text-[#3872fa]' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='box p-5 cursor-pointer rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <GiPieChart className='text-[30px] text-[#10b981]' />
            <div className='info w-[70%]'>
              <h3>Sales</h3>
              <b>${TodayRevenue}</b>
            </div>
            <IoStatsChartSharp className='text-[50px] text-[#10b981]' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='box p-5 cursor-pointer rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <BsBank className='text-[30px] text-[#7928ca]' />
            <div className='info w-[70%]'>
              <h3>Total Revenue</h3>
              <b>{TotalRevenue} VND</b>
            </div>
            <IoStatsChartSharp className='text-[50px] text-[#7928ca]' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='box p-5 cursor-pointer rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <RiProductHuntLine className='text-[30px] text-[#3812fa]' />
            <div className='info w-[70%]'>
              <h3>Total Products</h3>
              <b>{TotalProduct}</b>
            </div>
            <IoStatsChartSharp className='text-[50px] text-[#3812fa]' />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default DashboardBoxes