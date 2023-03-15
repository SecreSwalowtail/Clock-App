import { useEffect, useState } from 'react'
import refreshImage from '../src/assets/images/refresh-quote.svg'
import Time from './components/Time'

function App() {
  const [quote, setQuote] = useState()
  const [quoteAuthor, setQuoteAuthor] = useState()
  const [refresh, setRefresh] = useState(0)
  const [ip, setIp] = useState()
  const [isFetched, setIsFetched] = useState(false) //Keep track and show only if the ip got fetched

  // Fetch quote
  useEffect(() => {
    async function fetchQuote() {
      const response = await fetch('https://api.quotable.io/random')
      const data = await response.json()

      setQuote(`"${data.content}"`)
      setQuoteAuthor(data.author)
    }
    fetchQuote()
  }, [refresh])

  // Fetch ip
  useEffect(() => {
    async function fetchIp() {
      const response = await fetch('https://ip.seeip.org/json')
      const data = await response.json()
      console.log(data.ip)
      setIp(data.ip)
      setIsFetched(true)
    }
    fetchIp()
  }, [])

  // If user clicks the image , run the fetch function again
  const handleRefresh = () => {
    setRefresh(refresh + 1)
  }

  return (
    <main>
      <div className='quote'>
        <div className='quote-el1'>
          <p className='quote-text'>
            {quote}
          </p>
          <p className='quote-author'>
            {quoteAuthor}
          </p>
        </div>
        <img className='refresh-button' src={refreshImage} role={'button'} onClick={handleRefresh}/>
      </div>
      {isFetched && <Time ip={ip} />}
    </main>
  )
}

export default App
