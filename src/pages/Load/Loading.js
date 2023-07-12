import React from 'react';
import loading from "../../img/loading.svg"
// import { Container } from './styles';

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center absolute'>
      <img className='w-14 rounded-full' src={loading} alt="Loading" />
    </div>
  )
}

export default Loading;