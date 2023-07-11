import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../imagenes/claqueta.png'
import '../hojas-de-estilo/Header.css'
import { Outlet } from 'react-router-dom';

const Header = ( {eventoBuscador, eventoSetBusqueda} ) => {

    return (  
        <Navbar expand="lg" className="navbar navbar-expand-md navbar-light">
                <Container> 
                    <Navbar.Brand href="#">
                        <img className='imagen-menu'
                        src={require("../imagenes/claqueta.png")} alt="imagen-menu" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse  className='nav-collapse' id="navbarScroll">
                        <Nav
                        className="nav me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                        >
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/Favoritas">Favoritas</Nav.Link>
                        <Nav.Link href="/Register">Registrate</Nav.Link>
                        </Nav>
                        <Form 
                            className='d-flex' 
                            onSubmit={eventoBuscador}
                            
                        > 
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={eventoSetBusqueda}
                            
                        />
                        <Button  type='submit' className="boton-header">Search</Button>
                        </Form> 
                    </Navbar.Collapse>
                </Container>
                <Outlet/>
        </Navbar>
    );
}
 
export default Header;












