import { useEffect, useState } from "react"
import HeroSection from "../components/home/HeroSection"
import SecondSection from "../components/home/SecondSection"
import ThirdSection from "../components/home/ThirdSection"
import FourSection from "../components/home/FourSection"
import FiveSection from "../components/home/FiveSection"

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 830)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  
  return (
    <main>
      <HeroSection isMobile={isMobile} />
      <SecondSection />
      <ThirdSection isMobile={isMobile} />
      <FourSection isMobile={isMobile} />
      <FiveSection />
    </main>
  )
}

export default Home