import { useEffect, useState } from 'react';
import './App.css';
import Header from './componentes/Header'
import Body from './componentes/Body'
import CardPelicula from './componentes/CardPelicula';
import Favoritas from './componentes/Favoritas';
import Footer from './componentes/Footer';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  
  // url luego se ocultaran en archvo .env
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = 'c27e805b0ae8cc7280e80eaa53f9a9c0'
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'


  // Variables de estado
  const [peliculas, setPeliculas] = useState([]);
  const [busquedaDeUsuario, setBusqueda] = useState("");
  const [pelicula, setPelicula] = useState({});
  // lista de favoritas
  let [peliculasFavoritas, setPeliculasFavoritas] = useState([]);


// Función para obtener películas buscadas por el usuario
  const obtenerPeliculas = async (busquedaDeUsuario) => {
    const tipo = busquedaDeUsuario ? "search" : "discover";
    try {
      const api = await fetch(`${API_URL}/${tipo}/movie?api_key=${API_KEY}&query=${busquedaDeUsuario}`);
      const { results } = await api.json();
      setPeliculas(results);
    } catch (error) {
      console.error(error);
    }
  };

// Función para buscar películas
  const buscarPeliculas = (e) => {
    e.preventDefault();
    obtenerPeliculas(busquedaDeUsuario);
  };

// Función para obtener una sola película
  const obtenerPelicula = async (id) => {
    try {
      const api = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
      const { results } = await api.json();
      setPelicula(results);
    } catch (error) {
      console.error(error);
    }
  };


// Función para seleccionar una película
  const seleccionarPelicula = async (pelicula) => {
    obtenerPelicula(pelicula.id);
    setPelicula(pelicula);
    console.log(pelicula)
  };


  useEffect(() => {
    // Obtener la lista de favs del localStorage
    const storedFavoritas = localStorage.getItem('favoritas');
    if (storedFavoritas) {
        peliculasFavoritas = JSON.parse(storedFavoritas)
        setPeliculasFavoritas(JSON.parse(storedFavoritas))
    }
  }, []);

  useEffect(() => {
    // Guardar lala lista de favs del localStorage cada vez que se actualice "listaDeFavs"
    localStorage.setItem('favoritas', JSON.stringify(peliculasFavoritas));
  }, [peliculasFavoritas]);


  // funcion que toma pelicula por parametro y la agrega a lista de fav, sin pisar las anteriores por eso los ...
  const agregarPeliculaFavorita = (pelicula) => {
    setPeliculasFavoritas([...peliculasFavoritas, pelicula]);
    };

  const eliminarPeliculaFavorita = (id) => {
    const peliculasActualizadas = peliculasFavoritas.filter(
      (pelicula) => pelicula.id !== id
    );
    setPeliculasFavoritas(peliculasActualizadas);
    };

  useEffect(() => {
    obtenerPeliculas();
  }, []);



return (
    <div className='App'>
  <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Header eventoBuscador={buscarPeliculas} eventoSetBusqueda ={(e) => setBusqueda(e.target.value)}/>
              <Body 
                  titulo={"Ultimos lanzamientos: "}
                  contenido={peliculas.map((pelicula) => (
                    <CardPelicula
                        key={pelicula.id}
                        evento={() => seleccionarPelicula(pelicula)}
                        imagen={`${IMAGE_PATH + pelicula.poster_path}`}
                        titulo={pelicula.title}
                        info={pelicula.overview}
                        fecha={pelicula.release_date}
                        eventoBoton={() => agregarPeliculaFavorita(pelicula)}
                        nombreBoton={"Favoritas"}
                        esBotonDeFav={true}
                    />
                    ))}
              />
              <Footer/>
            </>
          } />
           <Route path="/Favoritas" element={<Favoritas peliculasFavoritas={peliculasFavoritas} funcionEliminar={eliminarPeliculaFavorita} imagen = {IMAGE_PATH} funcion={seleccionarPelicula} />} />
   

        </Routes>
      </div>
    </BrowserRouter>
    </div>
      );
    }

export default App;


