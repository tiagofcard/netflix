import React, { useEffect, useState } from 'react'
import { getHomeList, getMovieInfo } from './Tmdb'
import MovieRow from './components/MovieRow'
import './App.css'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default function App() {
  const [movielist, setMovielist] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await getHomeList()
      setMovielist(list)

      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      )
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scoll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movielist.map((item, key) => (
          <MovieRow Key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix. Dados pegos do site Themoviedb.org.
      </footer>
    </div>
  )
}
