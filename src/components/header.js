import {React} from 'react'
import Link from 'next/link';

export default function Header({title, redirect, redirectText}) {
    // window.clerk.Signout
  return (
    <div style={{display:"flex", alignItems:"center"}}>
        <div className='done_padding'>
          <Link href={redirect}>
              <button className='default_button'>
                <div>{redirectText}</div>
              </button>
          </Link>
        </div>
          <div className='done_title'>{title}</div>
          <div className='done_padding'> 
            <Link href={"/"} style={{float:"right"}}>
                <button className='default_button' onClick={async () => await window.Clerk.signOut()}>
                  <div>Logout</div>
                </button>
            </Link>
          </div>
    </div>
  ) 
}
