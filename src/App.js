import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import LocalGo from "./pages/LocalGo";
import Puzzle from "./pages/Puzzle";
import Gomoku from "./pages/Gomoku";
import './App.css';
import {Col, Row} from "react-bootstrap";

function App() {
  return (
      <>
          <Row>
          <BrowserRouter>
                  <Col xs={2} className="col-md-12 d-none d-md-block bg-light sidebar">
                      <h2>GO & <br/> GOMOKU</h2>
                      <Layout />
                  </Col>
                  <Col xs={10} className="page-content">
                          <Routes>
                              <Route index element={<Home />} />
                              <Route path="go" element={<LocalGo />} />
                              <Route path="puzzle" element={<Puzzle />} />
                              <Route path="gomoku" element={<Gomoku />} />
                          </Routes>
                  </Col>

          </BrowserRouter>
          </Row>
      </>
  );
}

export default App;
