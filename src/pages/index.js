import Link from 'next/link';
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="App, root-page">
        Much Todo About Nothing
        <br></br><Link href="/todos">Log in</Link>
      </div>  
    </>
  )
}
