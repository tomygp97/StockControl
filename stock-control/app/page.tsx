'use client'

import React from 'react'
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';


const Home = () => {
  const { isSignedIn } = useUser();

  if(isSignedIn) {
    redirect("/products");
    // redirect("/sales");
  }

  return (
    <main>
      <div>Landing inicial</div>
      {/* <div className="flex flex-col h-full">
        <div className='h-[40%] flex flex-col items-center gap-10 justify-center'>
          <h1 className="font-bold text-[70px] text-gray-50">Lavapp</h1>
          <div className='flex items-center space-x-5'>
            { !isLoaded &&
              <Spinner size="lg" />
            }
            { isLoaded  &&
              <SignInButton mode="modal">
                <Button variant="secondary">
                  Ingresar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </SignInButton>
            }
          </div>
        </div>
        <div className="h-auto flex flex-col items-center">
          <Image
            alt="Logo"
            src={stockControlLogo}
            sizes="40vw"
            className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-auto"
          />
        </div>
      </div> */}
    </main>

  )
}

export default Home