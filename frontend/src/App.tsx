import { useState } from 'react'
import { Header, PinfoBox, PinList } from './Components';
import './App.css'

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <PinList /> */}
      <PinfoBox />
    </div>
  );
}

export default App
