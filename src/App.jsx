import { useState } from 'react'
import ReactDOM from 'react-dom/client';
import CardsApp from './components/Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <>
      <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-2 text-center alert alert-success text-lg-center" >
            Healthy Center
          </h1>
        </div>
      </div>
    </div>  
    <CardsApp/>
    </>
  )
}

export default App
