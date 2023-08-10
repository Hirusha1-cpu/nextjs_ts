import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticle'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { Alert } from 'react-bootstrap'
const inter = Inter({ subsets: ['latin'] })

interface BreakingNewsPageProps{
  newsArticles: NewsArticle[]
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = 

async () => {
  await new Promise(r => setTimeout(r,3000));
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=81d7d1671cdf4fa19c3a95788a877d8f")
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {newsArticles: newsResponse.articles}
  }
}

export default function BreakingNewsPage({newsArticles}:BreakingNewsPageProps) {
  return (
    <>
    <Head>
      <title key="title">Breaking News - NextJS News App</title>
    </Head>
    <main
      className={`flex min-h-screen flex-col  ${inter.className}`}
    >
      <h1>Breaking News</h1>
      <Alert>Lorem ipsum dolor, 
       <strong>sit amet consectetur adipisicing elit.</strong>  Nisi perferendis consectetur maiores iure, corporis tempora ab animi cupiditate sequi quidem voluptates explicabo labore! Deleniti assumenda officiis, veritatis incidunt recusandae quod?</Alert>
      {/* {JSON.stringify(newsArticles)} */}
      {/* <NewsArticleEntry article={newsArticles[0]}/> */}
      <NewsArticlesGrid articles={newsArticles}/>
    </main>
    </>
  )
}
