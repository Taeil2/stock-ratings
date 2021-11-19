import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import Results from '../components/results'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useState } from 'react'

const SearchButton = styled.button`
  width: 20px;
  color: red;
  svg {
    width: 100%;
    height: 100%;
  }
`

const Home: NextPage = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <Head>
        <title>Stock Ratings</title>
        <meta name="description" content="Find analyst ratings for stocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex container">
          <input type="text" />
          <SearchButton><FontAwesomeIcon icon={faSearch} /></SearchButton>
        </div>
        <Results search={search} />
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
