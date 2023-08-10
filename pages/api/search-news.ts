// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticle';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();
  if(!searchQuery){
    return res.status(404).json({ error: "Please provide a search query"})
  }
  const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=81d7d1671cdf4fa19c3a95788a877d8f`)
  const newsResponse : NewsResponse = await response.json()

  res.status(200).json(newsResponse.articles)
}
