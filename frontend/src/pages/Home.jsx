import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Hero from '../components/Hero'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'

const Home = () => {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style That" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only" },
    { text1: "New Arrivals", text2: "Up to 50% off" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-hidden relative mt-[70px]">
      {/* 👆 yaha pe top-[50px] hata diya aur margin-top diya nav ke liye */}
      
      <div className="w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] h-[100vh]">
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
