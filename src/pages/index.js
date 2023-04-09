import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function Home() {
  return (
    <>
      <div className="App, root-page">
        Much Todo About Nothing
        <br></br><Link href="/todos">Log in</Link>
      </div>
      
    </>
  )
}
