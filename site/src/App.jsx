import { useState, useEffect } from 'react'
import '@fontsource/poppins';

import VideoGrid from './components/VideoGrid';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'MDS-Player';
  }, []);

  return (
    <>
      <title>test</title>
      <Header></Header>
      <VideoGrid />
    </>
  )
}

export default App
