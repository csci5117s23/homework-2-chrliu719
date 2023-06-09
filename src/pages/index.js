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
        <SignInButton redirectUrl="/todos" mode="modal">
          <button className='default_button'>
            <div style={{fontSize:"3vh"}}>Sign Up/In</div>
          </button>
        </SignInButton>
      </div>  
    </>
  )
}
