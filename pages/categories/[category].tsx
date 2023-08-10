import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticle, NewsResponse } from '@/models/NewsArticle'
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { Alert } from 'react-bootstrap';
interface CategoryNewsPageProps{
    newsArticles: NewsArticle[];
}

export const getStaticPaths : GetStaticPaths = async()=>{
    const categorySlugs= [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ]
    
    const paths = categorySlugs.map(slug => ({params:{category: slug}}));
    return {
        paths,
        fallback:false,
    }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps>= async({params})=>{
    const category = params?.category?.toString();
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=81d7d1671cdf4fa19c3a95788a877d8f`)
    const newsResponse: NewsResponse = await response.json();
    return {
      props: {newsArticles: newsResponse.articles},
      revalidate:5 * 60,
    }
    //let error go to 500page

}


const CategoryNewsPage = ({newsArticles}:CategoryNewsPageProps) => {
    const router = useRouter();
    const categoryName = router.query.category?.toString();
    const title = "Category: " + categoryName


  return (
    <>
    <Head>
        <title key="title">{`${title} - Next news App`}</title>
    </Head>
        <main>
            <h1>{title}</h1>
            <Alert>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt assumenda culpa voluptatibus numquam tempora, nobis incidunt debitis soluta, nulla aliquam perspiciatis nostrum? Tempora expedita aut labore id quam autem adipisci?
            </Alert>
            <NewsArticlesGrid articles={newsArticles}/>
        </main>
    </>
  )
}

export default CategoryNewsPage