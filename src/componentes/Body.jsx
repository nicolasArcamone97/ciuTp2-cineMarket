import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../hojas-de-estilo/Body.css'



const Body = ( {contenido, titulo} ) => {
    return (  
        <div className='contenedor-principal-peliculas'>
            <Container className='contenedor-peliculas'>
                    <Row>
                        <h2>{titulo}</h2>
                        {contenido}
                    </Row>
            </Container>
        </div>  
    );
}
 
export default Body;