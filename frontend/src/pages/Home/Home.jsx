import React from 'react'
import "./home.scss"
import Banner from '../../components/Home/Banner/Banner'
import TopServices from '../../components/Home/TopServices/TopServices'
import UpcomingEvents from '../../components/Home/UpcomingEvents/UpcomingEvents'

const Home = () => {
  return (
    <div className='home-container'>
      <Banner />
      <UpcomingEvents />
      <TopServices />
    </div>
  )
}

export default Home