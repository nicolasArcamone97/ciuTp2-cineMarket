import React from 'react';
import Header from './Header';
import Body from './Body';
import CardPelicula from './CardPelicula';
import Footer from './Footer';

const Favoritas = ({peliculasFavoritas, funcionEliminar, funcion,imagen}) => {
    return ( 
     <div>
     <Header />
     
     <Body
        titulo={"Estas son tus peliculas Favoritas: " }
         contenido={peliculasFavoritas.map((pelicula) => (
          <CardPelicula
              key={pelicula.id}
              evento={() => funcion(pelicula)}
              imagen={`${imagen + pelicula.poster_path}`}
              titulo={pelicula.title}
              info={pelicula.overview}
              fecha={pelicula.release_date}
              eventoBoton={() => funcionEliminar(pelicula.id)}
              nombreBoton={"Eliminar"}
              esBotonDeFav={false}
          />
          ))}
        />
        <Footer/>

     </div>
    );
}
 
export default Favoritas;





