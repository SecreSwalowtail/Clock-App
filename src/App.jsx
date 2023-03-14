import { useEffect, useState } from 'react'

function App() {
  const [quote, setQuote] = useState()

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setQuote(data.content))
      .catch(error => console.error(error))
  }, [])

  return (
    <main>
      <p>{quote}</p>
    </main>
  )
}

export default App
