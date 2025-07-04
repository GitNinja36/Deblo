import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorAgentList from './_components/DoctorAgentList'

function Workspace() {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>My Dashboard</h2>
            <Button>+ Consult with Doctor</Button>
        </div>
        <HistoryList/>
        <DoctorAgentList/>
    </div>
  )
}

export default Workspace
