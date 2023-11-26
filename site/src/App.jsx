import { useState, useEffect } from 'react'
import '@fontsource/poppins';

import VideoGrid from './components/VideoGrid';
import Header from './components/Header';
import VideoModal from './components/VideoModal';

function App() {
  useEffect(() => {
    document.title = 'MDS-Player';
  }, []);

  var streams = [
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    }
  ];

  return (
    <>
      <Header />
      <VideoGrid />
      <VideoModal streams={streams} />
    </>
  )
}

export default App
