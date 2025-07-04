import React from 'react'
import AppHeader from './_components/AppHeader';

function Dashboard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <AppHeader/>
        <div className='px-10 md:px-2 lg:px-40 py-10'>
            {children}
        </div>
    </div>
  )
}

export default Dashboard 
