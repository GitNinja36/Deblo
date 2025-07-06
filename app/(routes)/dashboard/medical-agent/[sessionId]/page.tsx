"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';

type SessionDetail={
  id: number, 
  notes: string, 
  sessionId : string, 
  report: JSON, 
  selectedDoctor: doctorAgent, 
  createdOn: string
}

type messages = {
  role : string,
  text : string
}

function MedicalVoiceAgent() {
  const {sessionId} = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string|null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([])
  
  useEffect(()=>{
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async() => {
    const result = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  }

  const StartCall=()=>{
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    vapi.on('call-start', () => {
      console.log('Call started')
      setCallStarted(true)
    });
    vapi.on('call-end', () => {
      console.log('Call ended')
      setCallStarted(false)
    });
    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const {role, transcriptType, transcript} = message;
        if(transcriptType == 'partial'){
          setLiveTranscript(transcript);
          setCurrentRole(role);
        }else if(transcriptType == 'final'){
          setMessages((prev:any)=>[...prev, {role : role, text : transcript}]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });
    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
    });
    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user');
    });
  }

  const endCall = () => {
    if (!vapiInstance) return;
    vapiInstance.stop();
    vapiInstance.off('call-start');
    vapiInstance.off('call-end');
    vapiInstance.off('message');

    setCallStarted(false);
    setVapiInstance(null);
  };

  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`h-4 w-4 rounded-full ${callStarted?'bg-green-500':'bg-red-500'}`}/>{callStarted ? 'connected...' : 'Not Connected'}</h2> 
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>

      {sessionDetail && <div className='flex items-center flex-col mt-10'> 
          <Image 
            src={sessionDetail?.selectedDoctor?.image} 
            alt={sessionDetail?.selectedDoctor?.specialist} 
            width={120} 
            height={120}
            className='h-[100px] w-[100px] object-cover rounded-full'
          />
          <h2 className='mt-2 text-lg '>{sessionDetail?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Health Interaction Agent</p>

          <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
          {messages?.slice(-4).map((msg:messages, index) => (
            <h2 className='text-gray-400 p-2' key={index}>{msg.role} : {msg.text}:</h2>
          ))}

            {liveTranscript && liveTranscript?.length > 0 && <h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>}
          </div>

          {!callStarted ? 
          <Button 
            className='mt-20' 
            onClick={StartCall}
          ><PhoneCall/> Start Call
          </Button>
          :
          <Button 
            variant={'destructive'}
            onClick={endCall}
            >
            <PhoneOff/> Dissconnect
          </Button>
          }
        </div>
      }
    </div>
  )
}

export default MedicalVoiceAgent
