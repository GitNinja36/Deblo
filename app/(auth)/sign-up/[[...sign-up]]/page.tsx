import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center h-screen justify-center'>
        <SignUp />
    </div>
  )
}