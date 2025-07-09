"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog';
import axios from 'axios';
import HistoryTable from './HistoryTable';
import { SessionDetail } from '../medical-agent/[sessionId]/page';

function HistoryList() {
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    useEffect(()=>{
      GetHistoryList();
    }, [])

    const GetHistoryList= async()=>{
      const result = await axios.get('/api/session-chat?sessionId=all');
      setHistoryList(result.data);
    }

  return (
    <div className='mt-10'>
      {historyList.length == 0?
      <div className='flex items-center flex-col justify-conter p-7 border border-dashed rounded-2xl border-2'>
        <Image src={'/medical-assistance.png'} alt='empty' height={150} width={150}/>
        <h2 className='font-bold text-xl mt-5'>No Recent Consultations</h2>
        <p>You haven't consulted with any doctor yet</p>
        <AddNewSessionDialog/>
      </div>
      :<div>
        <HistoryTable historyList={historyList}/>
      </div>  
    }
    </div>
  )
}

export default HistoryList
