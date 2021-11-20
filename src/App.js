import styled from "styled-components";
import axios from "axios";
import FilmContent from "./components/FilmContent";
import React, { useEffect,useState } from "react";
import FilmInfo from "./components/FilmInfo";
export const API_KEY = "e1f9d98";

const Container =styled.div
`display: flex;
flex-direction: column`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div
` 
  background-color: #af0404 ;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 10px 8px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-right: 100px;
  background-color: #cfc5c5;
  width: 8rem;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  display: flex;
  flex-direction: row;
  background-color: #cfc5c5;
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: -webkit-fill-available;
  margin-right: 26px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
const Icon = styled.img
`
width:50px;
height:48px;
margin:15px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [totalResults, setTotalResults] = useState([]);

  const fetchData = async (search) => {
    const firstResponse = await axios.get(
      `https://www.omdbapi.com/?s=${search}&page=1&apikey=${API_KEY}`
    );
    const secondResponse = await axios.get(
      `https://www.omdbapi.com/?s=${search}&page=2&apikey=${API_KEY}`
    );
    if (
      firstResponse.data.Response === "True" && secondResponse.data.Response === "True"
    ) {
      setTotalResults(
        firstResponse.data.Search.concat(secondResponse.data.Search)
      );
      console.log(totalResults);
      updateMovieList(totalResults);
    }
  };
  function onTextChange(event){
    const { value } = event.target;
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(value);
  }
  useEffect(() => {
    if (searchQuery.length > 2) {
        const timeoutId = setTimeout(() => {
            fetchData(searchQuery);
        }, 300);
        updateTimeoutId(timeoutId);
    } else {
        updateMovieList([]);
    }
    }, [searchQuery]);


  return (
    <Container >
      <Header><AppName >
        <Icon src="/movie.svg" />
        Movie App</AppName>
        <SearchBox>
          <SearchIcon src="/search.svg"/>
          <SearchInput placeholder="Search..." value={searchQuery} onChange={onTextChange}/>
        </SearchBox>
        </Header>
        {selectedMovie && <FilmInfo selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
        <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <FilmContent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
         
        ) : (
          <Placeholder src="/movie.svg" />
        )}
        </MovieListContainer>
    </Container>
  );
}

export default App;
