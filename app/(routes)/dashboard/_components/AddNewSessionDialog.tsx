"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader, Loader2 } from 'lucide-react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'

function AddNewSessionDialog() {
    const [note, setNote] = useState<string>();
    const[loading, setLoading] = useState(false);
    const[suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>();
    const[selectedDoctor, setSlectedDoctor] = useState<doctorAgent>();
    const router = useRouter();

    const OnClickNext = async() => {
        setLoading(true)
        const result = await axios.post('/api/suggest-doctors', {
            notes:note
        });
        console.log(result.data)
        setSuggestedDoctor(result.data)
        setLoading(false)
    }

    const onStartConsultation= async()=>{
        setLoading(true)
        const result = await axios.post('/api/session-chat', {
            notes : note,
            selectedDoctor : selectedDoctor
        });
        console.log(result.data)
        if(result.data?.sessionId){
            console.log(result.data.sessionId);
            router.push('/dashboard/medical-agent/'+result.data.sessionId);
        }
        setLoading(false)
    }

  return (
    <Dialog>
        <DialogTrigger>
            <Button className='mt-3'>+ Start new Consultation</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add basic Details</DialogTitle>
                <DialogDescription asChild>
                    { !suggestedDoctor ? 
                        <div>
                            <h2>Add Symptoms or any other details</h2>
                            <Textarea 
                                placeholder='Add Details here' 
                                className='h-[200px] mt-2'
                                onChange={(e)=>setNote(e.target.value)}
                            />
                        </div>
                        :
                        <div >
                            <h2>Select the doctor</h2>
                            <div className='grid grid-cols-3 gap-5'>
                                {suggestedDoctor.map((doctor, index) => (
                                    <SuggestedDoctorCard doctorAgent={doctor} key={index} setSlectedDoctor={() => setSlectedDoctor(doctor)}
                                    //@ts-ignore
                                    selectedDoctor={selectedDoctor} />
                                ))}
                            </div>
                        </div>
                    }
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button variant={'outline'}>Cancel</Button>
                </DialogClose>
                {!suggestedDoctor ?
                    <Button onClick={() => OnClickNext()} disabled={!note || loading}>
                        
                        Next {loading ? <Loader2 className='animate-spin'/>:<ArrowRight/>}
                    </Button>
                    :
                    <Button 
                        onClick={()=>onStartConsultation()}
                        disabled={loading || !selectedDoctor}
                    >Start Consultation {loading ? <Loader2 className='animate-spin'/>:<ArrowRight/>}</Button>
                }
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default AddNewSessionDialog
