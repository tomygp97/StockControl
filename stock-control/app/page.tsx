import React from 'react'
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Stock Control",
  description: "Stock Control App",
  icons: {
    icon: "./public/stockControl-logo.png",
  }
}

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Image src="/stockControl-logo.png" alt="Stock Control Logo" width={200} height={200}/>
    </>

  )
}

export default Home