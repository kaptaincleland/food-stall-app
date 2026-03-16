"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/images/—Pngtree—a delicious plate of jollof_19458192.jpg', 
  '/images/Downpic.cc-1899117250.jpg',
  '/images/Downpic.cc-1968260083.jpg',
]

export default function HomeCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => { // change the image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    // Clean up the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt="Delicious food from Mom's Stall"
            fill
            className="object-cover" 
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/50 z-10" />
    </div>
  )
}