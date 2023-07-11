import React from 'react';
import '../hojas-de-estilo/CardPelicula.css'
import { Col } from 'react-bootstrap';



const CardPelicula = ( {key,evento, titulo, fecha , imagen,info,eventoBoton,nombreBoton, esBotonDeFav }) => {
    return (  
        <Col xxs={12} md={12} lg ={6} xxl={4}>
            <div className='card' key={key} onClick={evento}>
                <img className= 'card-media'src={imagen} alt=""  width="100%"/>
            <div className='card-content'>
                    <div className='card-header'>
                        <div className='left-content'>
                                <h4>{titulo}</h4>
                                <span>{fecha}</span>
                        </div>
                        <div className='right-content'>
                            <button className={ esBotonDeFav ? "card-btn" : "card-btn-eliminar"} onClick={eventoBoton}>{nombreBoton}</button>
                        </div>
                    </div>
                    <div className='card-info'>
                           <p> {info} </p> 
                    </div>
                </div>
                </div>
    </Col>
    );
}
 
export default CardPelicula;