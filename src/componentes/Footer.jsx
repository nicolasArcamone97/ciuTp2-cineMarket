import React from 'react';
import '../hojas-de-estilo/Footer.css'

const Footer = () => {
    return (  
        <div className='footer'>
            <div className='container'>
                <div className='footer-row'>
                    <div className='footer-links'>
                        <h4>Compañia</h4>
                        <ul>
                            <li><a href="#3">Nosotros</a></li>
                            <li><a href="#2">Nuestros servicios</a></li>
                            <li><a href="#1">Politica de privacidad</a></li>
                        </ul>
                    </div>
                    <div className='footer-links'>
                        <h4>Ayuda</h4>
                        <ul>
                            <li><a href="#5">Preguntas frecuentes</a></li>
                        </ul>
                    </div>
                    <div className='footer-links'>
                        <h4>Siguenos</h4>
                        <ul>
                            <li><a href="#a"><i className="bi bi-facebook"></i></a></li>
                            <li><a href="#e"><i className="bi bi-instagram"></i></a></li>
                            <li><a href="#e"><i className="bi bi-twitter"></i></a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
 
export default Footer;