import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className='w-[100%] bg-white'>
        <div className='h-screen lg:flex md:px-36 items-center justify-center bg-white'>
            {children}
        </div>
    </section>
  )
}

export default AuthLayout