import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuid} from 'uuid';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormularioRegistro = ({agregarUsuarios}) => {
  
  // Creo un usuario vacio y lo inicio con un hook de estado
  const [usuario, editarUsuario] = useState({
    nombre:"",
    password:""
  });

  // Extraer valores
  const {nombre,password} = usuario;

  // hook para manejar errores
  const [error, setError] = useState(false);


  //obtenemos lo que el usuario escribe
    const handleChange = (e) => {
      editarUsuario({
        ...usuario,
        [e.target.name] : e.target.value
      })
    };


    // cuando se envia el formulario se ejecuta esta funcion
    const submitForm = (e) => {
      e.preventDefault();
      // console.log("Enviado")
    
     // validar formulario
    if(nombre.trim() === ''){
      setError(true);
      return;
    }


    // Mensaje de error
    setError(false);
  
    // poner un id
    usuario.id = uuid();
    

    // Guardar el usuario
    agregarUsuarios(usuario);

    // limpiar formulario 
    editarUsuario({
      nombre:"",
      password:""
    })

  
    };

    return (  

        <Fragment>
        <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
                  type="text" 
                  placeholder="Nombre Completo"
                  name="nombre" 
                  onChange={handleChange}
                  value={nombre}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            name="password" 
            onChange={handleChange}
            value={password}/> 
        </Form.Group>
        <Button 
            type="submit">
            Registrarme
        </Button>
      </Form>
      
      {
        error
        ? <h4>No ingreaste datos aun</h4>
        : null 
      }
      </Fragment>
    );
}
 
export default FormularioRegistro;