import React from "react";
import TableApp from "./components/TableApp"
import FormApp from "./components/FormApp"
// import "./style.css";
import {Container} from "reactstrap";

export default function App() {
  return (
    <Container>
      {/* <h1>hello</h1> */}
     <FormApp/>
     <TableApp/>
    </Container>
  );
}
