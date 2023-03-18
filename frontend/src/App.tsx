import { useState } from 'react'
import { Header, Footer } from './components/Components';
import { Main } from './components/Main';

function App() {
  return (
    <div className='App'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App
