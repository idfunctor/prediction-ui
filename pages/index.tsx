import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Tab } from "components/Tab/Tab";
import { HomeTabs } from 'modules/Main/HomeTabs'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Encord Challenge</title>
        <meta name="description" content="Tech challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HomeTabs />
      </main>
    </div>
  )
}

export default Home
