import { useState } from 'react'
import { Header } from './Components';
import { PinList } from './components/PinList';
import './App.css'

function App() {
  return (
    <div className='App'>
      <Header />
      <PinList />
    </div>
  );
}

export default App
