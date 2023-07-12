import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import Loading from "../pages/Load/Loading";
// import { Container } from './styles';

function Poker() {
  const [removeLoading, setRemoveLoading] = useState(false)
  const [pokers, setPokers] = useState([]);
  const [fav, setFav] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [pageAtual, setPageAtual] = useState(1);
  const [pageLimite] = useState(50);

  const pokemon = pokers.filter((p) =>
    p.name.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())
  );
  const ultimoItem = pageAtual * pageLimite;
  const inicioItem = ultimoItem - pageLimite;

  const itemAtual = pokemon.slice(inicioItem, ultimoItem);

  const paginas = (pagina) => {
      setRemoveLoading(false)
      setTimeout(() => {
        setPageAtual(pagina); 
        setRemoveLoading(true)
      }, 300);
   
  };

  // const pesquisar = (e) => {
  //   setPesquisa(e.target.value);
  //   const poker = pokers.filter(p => p.name.toLowerCase().includes(pesquisa.toLocaleLowerCase()))
  //   setPokers(poker);
  //   console.log(pesquisa)
  // }

  const favotiro = (id) => {
    setFav((prevFav) => {
      if (prevFav.includes(id)) {
        return prevFav.filter((favId) => favId !== id);
      } else {
        return [...prevFav, id]; 
      }
    });

  };

  useEffect(() => {
    setTimeout(() => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0")
      .then((r) => r.json())
      .then((data) => {
        setPokers(data.results);
        setRemoveLoading(true)
      });
    }, 3000);

  }, []);

  return (
    <>
      <div className="flex w-screen flex-col">
        <div className="flex justify-between items-center border-b-2 p-6 ">
          <div className="flex justify-center ">
            <h1 className="text-4xl">POKEMONS</h1>
          </div>
          <div className="relative text-black">
            <input
              className="p-2 w-64 rounded-xl "
              type="text"
              placeholder="Pesquisar"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <AiOutlineSearch className="absolute top-1 right-0 text-4xl text-black cursor-pointer " />
          </div>
        </div>
        <ul className="flex gap-4 flex-wrap text-center justify-center mt-5 mb-5">
          {itemAtual.map((poker, index) => {
            const pokermonID = inicioItem + index + 1;
            const like = fav.includes(pokermonID);
            return (
              <li
                className="w-64 border-2 p-5 flex justify-between bg-gradient-to-r from-gray-950 to-teal-950 rounded-lg"
                key={index}
              >
                {poker.name.charAt(0).toUpperCase() + poker.name.slice(1)}
                <button
                  onClick={() => favotiro(pokermonID)}
                  className="cursor-pointer text-3xl "
                >
                  {like ? (
                    <AiFillHeart className="text-red-600" />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </button>
              </li>
            );
          })}
        {!removeLoading && <Loading/>}
        </ul>

        <div className="flex justify-center p-2" >
          <ul className="flex gap-2">
            {pokemon.length > pageLimite &&
              Array.from({ length: Math.ceil(pokemon.length / pageLimite) }, (_, index) => (
                <li
                  key={index}
                  className={`cursor-pointer w-10 text-center rounded-full text-xl bg-white text-slate-950 p-1 hover:bg-zinc-400${
                    pageAtual === index + 1 ? 'font-bold' : ''
                  }`}
                  onClick={() => paginas(index + 1)}
                >
                  {index + 1}
                 
                </li>
              ))}
          </ul>
        </div>

      </div>
    </>
  )
}

export default Poker;