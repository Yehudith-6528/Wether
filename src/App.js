import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, withRouter } from "react-router-dom";
import Wether from "./components/wether";
import History from "./components/history";
import { Navbar, Nav, Container } from 'react-bootstrap';

function App(props) {

  return (

    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { props.history.push('/') }} >Wether Details</Nav.Link>
            <Nav.Link onClick={() => { props.history.push('/history') }}>Search History</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch>
        <Route exact component={History} path="/history" ></Route>
        <Route exact path="/" component={Wether} />
      </Switch>
    </div>


  );
}

export default withRouter(App);
