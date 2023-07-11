import React from 'react';
import Body from './Body';
import Header from './Header';
import FormularioRegistro from '../componentes/FormularioRegistro';
import Footer from './Footer';


const Register = ( {agregarUsuarios} ) => {
    return ( 
        <div>
        <Header/>

        <Body
            titulo={"Registrate"}
            contenido={<FormularioRegistro
                        agregarUsuarios={agregarUsuarios}
                        />}
        />


        <Footer/>
        </div>
     );
}
 
export default Register;