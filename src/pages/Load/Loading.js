import React from 'react';
import loading from "../../img/loading.svg"
// import { Container } from './styles';

function Loading() {
  return (
    <div className='w-full h-96 flex justify-center items-center'>
      <img className='w-14' src={loading} alt="Loading" />
    </div>
  )
}

export default Loading;