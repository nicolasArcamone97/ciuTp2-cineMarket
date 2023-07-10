import React from 'react';
import Card from 'react-bootstrap/Card';
import '../hojas-de-estilo/CardPelicula.css'



const CardPelicula = ( {key,evento, titulo, imagen,voto}) => {
    return (  
        <Card className='card-pelicula' key ={key} onClick={evento}>
          <Card.Img className='img-card' src={imagen} />
            <Card.Body className='card-body'>
              <Card.Title className='card-title' >{ titulo }</Card.Title>
                <Card.Text className='card-text'><i class="bi bi-star-fill"></i> {voto}</Card.Text>
            </Card.Body>
         </Card>
    );
}
 
export default CardPelicula;