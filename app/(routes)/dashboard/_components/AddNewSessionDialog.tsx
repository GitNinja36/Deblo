"use client"
import React, { useEffect, useState } from 'react'
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
import { useAuth } from '@clerk/nextjs'
import { SessionDetail } from '../medical-agent/[sessionId]/page'

function AddNewSessionDialog() {
    const [note, setNote] = useState<string>();
    const[loading, setLoading] = useState(false);
    const[suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>();
    const[selectedDoctor, setSlectedDoctor] = useState<doctorAgent>();
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    const router = useRouter();
    const { has } =  useAuth();
    //@ts-ignore
    const paidUser =has && has({ plan: 'pro' })

    useEffect(()=>{
        GetHistoryList();
      }, [])
  
      const GetHistoryList= async()=>{
        const result = await axios.get('/api/session-chat?sessionId=all');
        setHistoryList(result.data);
      }

    const OnClickNext = async () => {
        setLoading(true);
        try {
          const result = await axios.post('/api/suggest-doctors', { notes: note });
          if (!Array.isArray(result.data)) {
            throw new Error("AI did not return an array");
          }
          setSuggestedDoctor(result.data);
        } catch (err) {
          console.error("Failed to fetch suggested doctors", err);
          alert("Failed to fetch doctors. Try again later.");
        } finally {
          setLoading(false);
        }
      };

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
        <DialogTrigger asChild>
            <Button className='mt-3' disabled={!paidUser && historyList?.length>=1}>+ Start new Consultation</Button>
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
                            {Array.isArray(suggestedDoctor) && suggestedDoctor.length > 0 ? (
                                suggestedDoctor.map((doctor, index) => (
                                <SuggestedDoctorCard
                                doctorAgent={doctor}
                                key={index}
                                setSlectedDoctor={() => setSlectedDoctor(doctor)}
                                selectedDoctor={selectedDoctor}
                                />
                            ))
                            ) : (
                            <p className="text-sm text-red-500 col-span-3">No doctors found.</p>
                            )}
                            </div>
                        </div>
                    }
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
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
