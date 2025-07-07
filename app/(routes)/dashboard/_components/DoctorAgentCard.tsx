import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'

export type doctorAgent = {
  id : number,
  specialist : string,
  description : string,
  image : string,
  agentPrompt : string,
  voiceId? : string
}

type props={
    doctorAgent : doctorAgent
}

function DoctorAgentCard({doctorAgent}: props) {
  return (
    <div className=''>
      <Image 
        src={doctorAgent.image} 
        alt={doctorAgent.specialist} 
        width={200} 
        height={300}
        className='w-full h-[250px] object-cover rounded-xl'
        />
        <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
        <p className='line-clamp-2 text-sm text-grey-500'>{doctorAgent.description}</p>
        <Button className='w-full mt-2'>Start Consult <IconArrowRight/></Button>
    </div>
  )
}

export default DoctorAgentCard
