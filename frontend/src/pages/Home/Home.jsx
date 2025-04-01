import React from 'react'
import "./home.scss"
import Banner from '../../components/Home/Banner/Banner'
import TopServices from '../../components/Home/TopServices/TopServices'

const Home = () => {
  return (
    <div className='home-container'>
      <Banner />
      <TopServices />
    </div>
  )
}

export default Home