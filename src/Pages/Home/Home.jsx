import React from 'react'
import Hero from '../../Components/Hero'
import CategorySlider from '../../Components/CategorySlider'
import SectionWithSlider from '../../Components/SectionWithSlider'

function Home() {
  return (
    <div className='bg-yellow-50' >
      <Hero/>
      <CategorySlider/>
      <SectionWithSlider/>
    </div>
  )
}

export default Home