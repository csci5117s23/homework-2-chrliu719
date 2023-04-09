import Link from 'next/link';

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
