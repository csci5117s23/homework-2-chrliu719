import Link from 'next/link';
import { SignIn } from "@clerk/nextjs";

export default function Custom404() {
  return (
    <>
      <div className="App, root-page">
        Much Todo About Nothing
        <br></br>
        <br></br><br></br>
        <div style={{fontSize:"2vh"}}>
          404 - Page Not Found <br></br><br></br>Uh-Oh, we couldn't find this page. Lets go home
        </div>
        <Link href={"/"} style={{fontSize:"5vh"}}>
                <button className='default_button' onClick={async () => await window.Clerk.signOut()}>
                  <div>Go Home</div>
                </button>
        </Link> 
      </div>  
    </>
  )
}
