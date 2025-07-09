"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'

export type doctorAgent = {
  id : number,
  specialist : string,
  description : string,
  image : string,
  agentPrompt : string,
  voiceId? : string,
  subscriptionRequired : boolean
}

type props={
    doctorAgent : doctorAgent
}

function DoctorAgentCard({doctorAgent}: props) {
  const { has } =  useAuth();
  //@ts-ignore
  const paidUser =has && has({ plan: 'pro' })

  return (
    <div className='relative'>
      {doctorAgent.subscriptionRequired && <Badge className='absolute m-2 right-0'>
        Premium
      </Badge>}
      <Image 
        src={doctorAgent.image} 
        alt={doctorAgent.specialist} 
        width={200} 
        height={300}
        className='w-full h-[250px] object-cover rounded-xl'
        />
        <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
        <p className='line-clamp-2 text-sm text-grey-500'>{doctorAgent.description}</p>
        <Button className='w-full mt-2' disabled={!paidUser&&doctorAgent.subscriptionRequired}>Start Consult <IconArrowRight/></Button>
    </div>
  )
}

export default DoctorAgentCard
