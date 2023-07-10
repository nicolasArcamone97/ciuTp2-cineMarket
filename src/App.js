import { useEffect, useState } from 'react';
import './App.css';
import Header from './componentes/Header'
import Body from './componentes/Body'
import CardPelicula from './componentes/CardPelicula';


function App() {

  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = 'c27e805b0ae8cc7280e80eaa53f9a9c0'
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'


  // Variables de estado
  const [peliculas, setPeliculas] = useState([]);
  const [claveBusqueda, setClaveBusqueda] = useState("");
  const [pelicula, setPelicula] = useState({ título: "cargando películas" });




// Función para obtener películas
  const obtenerPeliculas = async (claveBusqueda) => {
    const tipo = claveBusqueda ? "search" : "discover";
    try {
      const respuesta = await fetch(`${API_URL}/${tipo}/movie?api_key=${API_KEY}&query=${claveBusqueda}`);
      if (respuesta.ok) {
        const { results } = await respuesta.json();
        setPeliculas(results);
        setPelicula(results[0]);
        if (results.length) {
          await obtenerPelicula(results[0].id);
        }
      } else {
        throw new Error('Error al obtener los datos de las películas');
      }
    } catch (error) {
      console.error(error);
    }
  };

// Función para buscar películas
  const buscarPeliculas = (e) => {
    e.preventDefault();
    obtenerPeliculas(claveBusqueda);
  };

// Función para obtener una sola película
  const obtenerPelicula = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
      if (respuesta.ok) {
        const data = await respuesta.json();
        setPelicula(data);
      } else {
        throw new Error('Error al obtener los datos de la película');
      }
    } catch (error) {
      console.error(error);
    }
  };


// Función para seleccionar una película
  const seleccionarPelicula = async (pelicula) => {
    obtenerPelicula(pelicula.id);
    setPelicula(pelicula);
  };

  useEffect(() => {
    obtenerPeliculas();
  }, []);






return (
    <div className='App'>
           <Header
            evento={buscarPeliculas}
            eventoDos={(e) => setClaveBusqueda(e.target.value)}
        />

        <Body
            contenido={peliculas.map((pelicula) => (
            <CardPelicula
                key={pelicula.id}
                evento={() => seleccionarPelicula(pelicula)}
                imagen={`${IMAGE_PATH + pelicula.poster_path}`}
                titulo={pelicula.title}
                voto={pelicula.vote_average}
            />
            ))}
          />
      

        </div>
      );
    }

export default App;


