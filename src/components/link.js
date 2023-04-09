import {React} from 'react'
import Link from 'next/link';

export default function CustomLink({href}) {
    
  return (
    <Link href={href} className='.link'></Link>
  ) 
}
