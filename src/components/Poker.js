import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";

// import { Container } from './styles';

function Poker() {
  const [pokers , setPokers] = useState([]);
  const [fav, setFav] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const pokemon = pokers.filter(p => p.name.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase()))

  // const pesquisar = (e) => {
  //   setPesquisa(e.target.value);
  //   const poker = pokers.filter(p => p.name.toLowerCase().includes(pesquisa.toLocaleLowerCase()))
  //   setPokers(poker);
  //   console.log(pesquisa)
  // }

  const favotiro = (id) => {
    setFav(prevFav => {
      if(prevFav.includes(id)){

        return prevFav.filter(favId => favId !==id);
      }else{

        return[...prevFav, id]
      }
    })
  
  }

  useEffect(() =>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0").then(r => r.json())
    .then(data => {
      setPokers(data.results);
    })

  },[])

  return (
    <>
    <div className='flex w-screen flex-col'>
      <div className="flex justify-between items-center border-b-2 p-6 ">
      <div className="flex justify-center ">
      <h1 className='text-4xl'>POKEMONS</h1>
      </div>
      <div className="relative text-black">
        <input className='p-2 w-64 rounded-xl ' type="text"  placeholder='Pesquisar' value={pesquisa} onChange={(e => setPesquisa(e.target.value))}/>
        <AiOutlineSearch className='absolute top-1 right-0 text-4xl text-black cursor-pointer '/>
      </div>
      </div>
     
    <ul className='flex gap-5 flex-wrap text-center justify-center mt-5 mb-5'>
    {pokemon.map((poker, index) => {
        const pokermonID = index + 1;
        const like = fav.includes(pokermonID);
          return (
        <li className='w-64 border-2 p-5 flex justify-between' key={index}>
          {poker.name}
          <button onClick={() => favotiro(pokermonID)} className='cursor-pointer text-3xl '>{like ? <AiFillHeart className='text-red-600'/>: <AiOutlineHeart/>}</button>
        </li>
        )
    }
    )}
    </ul>
    </div>
    </>
  )
}

export default Poker;