import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function ColorSchemesExample() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <Link className="nav-link" to="/habilitation">Habilitation</Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Link className="nav-link" to="/role">Role</Link>
                        <Link className="nav-link" to="/support">Support</Link>
                        <Link className="nav-link" to="/etablissement">Etablissement</Link>
                        <Link className="nav-link" to="/typehabilitation">Type habilitation</Link>
                        <Link className="nav-link" to="/personnel">Personnel</Link>
                        <Link className="nav-link" to="/habilitation">Habilitation</Link> */}
                    </Nav>
                </Container>
            </Navbar>
            <br />
        </>
    );
}

export default ColorSchemesExample;