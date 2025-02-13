import { useState } from 'react'
import bookLogo from './assets/books.png'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
    
      </>
  )
}

export default App

// TODO
// React Router to navigate

// browse a library catalog, 
// check out books,
// and return books
// review their account, 
// 
// use the `token`