import { useState, useEffect } from 'react'
import '@fontsource/poppins';

import VideoGrid from './components/VideoGrid';
import Header from './components/Header';
import VideoModal from './components/VideoModal';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'MDS-Player';
  }, []);

  return (
    <>
      <Header />
      <VideoGrid />
      <VideoModal />
    </>
  )
}

export default App
