import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'

function Workspace() {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>My Dashboard</h2>
            <AddNewSessionDialog/>
        </div>
        <HistoryList/>
        <DoctorAgentList/>
    </div>
  )
}

export default Workspace
