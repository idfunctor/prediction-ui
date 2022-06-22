import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return <NextUIProvider><Toaster containerStyle={{ zIndex: '999999' }} /><Component {...pageProps} /></NextUIProvider>
}

export default MyApp
