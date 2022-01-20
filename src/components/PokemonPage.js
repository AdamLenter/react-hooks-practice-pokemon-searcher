import React, { useEffect, useState } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {

  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonLoaded, setPokemonLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=> {
    fetch("http://localhost:3001/pokemon")
      .then((r)=>r.json())
      .then((pokemon) => setPokemonList(pokemon))
      .then(()=>setPokemonLoaded(true))   
      }, [])

  function updateSearchTerm(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  let displayedPokemon = [];
  if(searchTerm === "") {
        displayedPokemon = [...pokemonList];
      }
      else {
        displayedPokemon = pokemonList.filter((pokemon) => pokemon.name.toUpperCase().includes(searchTerm.toUpperCase()));
      }

  function addNewPokemon(pokemonInfo) {
    fetch("http://localhost:3001/pokemon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(pokemonInfo)
    })

    const newPokemonList = [...pokemonList, pokemonInfo];
    setPokemonList(newPokemonList);
  }
  
  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm addNewPokemon = {addNewPokemon} />
      <br />
      <Search searchTerm = {searchTerm} updateSearchTerm = {updateSearchTerm} />
      <br />
      <PokemonCollection pokemonList = {displayedPokemon} pokemonLoaded = {pokemonLoaded} />
    </Container>
  );
}

export default PokemonPage;
