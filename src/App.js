import { useEffect, useState } from 'react';
import './App.css';
import Header from './componentes/Header'
import Body from './componentes/Body'
import CardPelicula from './componentes/CardPelicula';
import Favoritas from './componentes/Favoritas';
import Footer from './componentes/Footer';
import Register from './componentes/Register';
import {HashRouter, Route, Routes } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  // url luego se ocultaran en archvo .env
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = 'c27e805b0ae8cc7280e80eaa53f9a9c0'
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'


  // Variables de estado
  const [peliculas, setPeliculas] = useState([]);
  const [busquedaDeUsuario, setBusqueda] = useState("");
  const [pelicula, setPelicula] = useState({});
  
  //hook vacio con diferentes usuarios
  const [usuarios, editarUsuarios] = useState([]);
 


  // funcion que toma el usuario nuevo y lo mete en el array
  const agregarUsuarios = (usuario) => {
      editarUsuarios([
        ...usuarios,
        usuario
      ])
  };

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
  };


  // Obtener la lista de favavoritas del localStorage
  useEffect(() => {
    const storedFavoritas = localStorage.getItem('favoritas');
    if (storedFavoritas) {
        peliculasFavoritas = JSON.parse(storedFavoritas)
        setPeliculasFavoritas(JSON.parse(storedFavoritas))
    }
  }, []);


  // Guarda la lista de favoritas del localStorage cada vez que se actualice "peliculasFavoritas"
  useEffect(() => { 
    localStorage.setItem('favoritas', JSON.stringify(peliculasFavoritas));
  }, [peliculasFavoritas]);


  // funcion que toma pelicula por parametro y la agrega a lista de favpritas, sin pisar las anteriores
  const agregarPeliculaFavorita = (pelicula) => {
    if(!peliculasFavoritas.some((peli => peli.id === pelicula.id))){
    setPeliculasFavoritas([...peliculasFavoritas, pelicula]);
    toast.success('Película agregada a favoritos', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
    });}
    };
    





  // funcion para eliminar pelicula de la lista de favoritas
  const eliminarPeliculaFavorita = (id) => {
    const peliculasActualizadas = peliculasFavoritas.filter(
      (pelicula) => pelicula.id !== id
    );
    setPeliculasFavoritas(peliculasActualizadas);
    toast.error('Eliminada correctamente', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    };


  useEffect(() => {
    obtenerPeliculas();
  }, []);


return (
    <div className='App'>
   <HashRouter>
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
           <Route path="/favoritas" element={<Favoritas peliculasFavoritas={peliculasFavoritas} funcionEliminar={eliminarPeliculaFavorita}  imagen = {IMAGE_PATH} funcion={seleccionarPelicula} />} />

           <Route path="/register" element={<Register agregarUsuarios={agregarUsuarios} />} />
        </Routes>
        </HashRouter>
    </div>
      );
    }

export default App;


