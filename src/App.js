import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/* Styles */
import './App.css';

const Header = () => {
	return (
		<header className="main-header">
            <h1>Solidaridad.uy</h1>
            <NavBar />      
        </header>
	)
}

const NavBar = () => {
    return (
        <nav>
            <Link to='/'>BOLSA DE TRABAJO</Link>
            <Link to='/'>¿CÓMO COLABORAR?</Link>
            <Link to='/'>UNITE A LOS EQUIPOS</Link>
            <Link to='/about'>¿QUIÉNES SOMOS?</Link>
            <Link to='/contact'>CONTACTO</Link>
        </nav>
    )
}

//
//

const App = () => {
	return (
		<Router>
            <Header />
            <Switch>
                <Route path="/about">
                    <p>Quienes somos</p>
                </Route>
                <Route path="/contact">
                    <p>Contacto</p>
                </Route>
                <Route exact={true} path="/">
                    <p>Home</p>
                </Route>
            </Switch>
		</Router>
	);
}

export default App;
