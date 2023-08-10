import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticle } from '@/models/NewsArticle'
import Head from 'next/head';
import React, { FormEvent, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap';

const SearchNewsPage  = () => {
    const [searchResults, setSearchResults] = useState<NewsArticle[]| null>(null)
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get('searchQuery')?.toString().trim();

        if(searchQuery){
            try {
                setSearchResults(null)
                setSearchResultsLoadingIsError(false)
                setSearchResultsLoading(true)
                const response = await fetch("/api/search-news?q="+ searchQuery);
                const articles: NewsArticle[] = await response.json();
                setSearchResults(articles)
            } catch (error) {
                console.error(error)
                setSearchResultsLoadingIsError(true)
            }finally{
                setSearchResultsLoading(false);
            }

        }
    }
  return (
    <>
    <Head>
        <title key="title">Search News - NextJs News App</title>
    </Head>
    <main className='flex min-h-screen flex-col'>
        <h1>Search News</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='search-input'>
                <Form.Label>Search Query</Form.Label>
                    <Form.Control name='searchQuery' placeholder='e.g. politics, sport ,...'/>

            </Form.Group>
            <Button type='submit' className='mb-3' disabled={searchResultsLoading} >
                Search
            </Button>
            <div className='d-flex flex-column align-items-center'>
                {searchResultsLoading && <Spinner animation='border'/>}
                {searchResultsLoadingIsError && <p>Something went wrong. plz try again</p>}
                {searchResults?.length === 0 && <p>Nothing Found. Try with a differenrt query</p>}
                {searchResults && <NewsArticlesGrid articles={searchResults}/>}

            </div>
        </Form>
    </main>
    </>
  )
}

export default SearchNewsPage 