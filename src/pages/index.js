import { useRouter } from 'next/router'
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { isLoaded, userId, sessionId, getToken} = useAuth();
  const router = useRouter();

  if(router.pathname != "/" && !userId){
    router.push('/');
  }
  else if (userId){
    router.push('/todos');
  }

  return (
    <>
      <div className="App, root-page">
        Much Todo About Nothing
        <br></br>
        <SignUpButton mode="modal" redirectUrl="/todos">
          <button className='default_button'>
            <div style={{fontSize:"3vh"}}>Sign Up</div>
          </button>
        </SignUpButton>
        <SignInButton redirectUrl="/todos" mode="modal">
          <button className='default_button'>
            <div style={{fontSize:"3vh"}}>Sign In</div>
          </button>
        </SignInButton>
      </div>  
    </>
  )
}
