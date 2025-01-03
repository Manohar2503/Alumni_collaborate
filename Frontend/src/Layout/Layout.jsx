import React from 'react'
import { Header,Footer } from '../Pages';
import Routers from '../Routers/Routers';

const Layout = () => {
  return <>
    <Header/>
    <main>
        <Routers/>
    </main>
  </>
}

export default Layout
