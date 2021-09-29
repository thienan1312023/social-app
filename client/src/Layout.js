import React, { useContext } from 'react';
import AuthRoute from './util/AuthRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Meet from './pages/Meet';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'semantic-ui-react';
import { ThemeContext } from './context/theme';

export const Layout = () => {
    const { themeColor } = useContext(ThemeContext);
    return (
        <>
        <Container>
            <div className={`header-container ${themeColor}`}><MenuBar /></div>
            <div className="body-container">
                <Route exact path="/" component={Meet} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={Register} />   
            </div>
        </Container>
        <Route exact path="/user/:userId" component={Home} />
        </>
    )
}
