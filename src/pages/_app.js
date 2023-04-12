import '@/styles/globals.css'
import '@/styles/App.css'
import Head from 'next/head'
import Home from './index'
import { useRouter } from 'next/router'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const publicPages = ["/"]

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isPublicPage = publicPages.includes(router.pathname);

  return (     
      <ClerkProvider {...pageProps} >
        <Head>
            <title>Much Todo About Nothing</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <Home/>
          </SignedOut>
        </ClerkProvider>
  )
}
