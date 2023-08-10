import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Container, Navbar } from 'react-bootstrap';
import styles from '@/styles/App.module.css'
import NavBar from '@/components/NavBar';
import NextNProgress from 'nextjs-progressbar'

const inter = Inter({subsets:['latin']});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
          <title key="title">NextJS News App</title>
          <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRcZdVeXSLSLiCda9I7CUABABemyLDP0pgle8Q3pDeaBKebhI0u-NfkFes70vl48xrSPE&usqp=CAU" />
      </Head>
      <NavBar />
      <NextNProgress />
      <Container className={styles.pageContainer}>
      <Component {...pageProps} />

      </Container>

    </div>
  )
}
