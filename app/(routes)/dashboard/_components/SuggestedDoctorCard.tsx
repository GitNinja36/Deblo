import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'


type props={
    doctorAgent : doctorAgent,
    setSlectedDoctor : any,
    selectedDoctor?: doctorAgent
}

function SuggestedDoctorCard({doctorAgent, setSlectedDoctor, selectedDoctor}:props) {
  const isSelected = selectedDoctor?.id === doctorAgent.id
  return (
    <div className={`flex flex-col items-center border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer ${isSelected ? 'border-blue-500' : ''}`} onClick={()=>setSlectedDoctor(doctorAgent)}>
      <Image 
        src={doctorAgent.image} 
        alt={doctorAgent.specialist}
        width={70}
        height={70}
        className='w-[50px] h-[50px] rounded-4xl object-cover'
    />
    <h2 className='font-bold text-sm text-center'>{doctorAgent.specialist}</h2>
    <p className='text-xs text-center line-clamp-2'>{doctorAgent.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard
