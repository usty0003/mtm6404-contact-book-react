import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Contacts from "./pages/Contacts";
import EditContact from './pages/EditContact';
import CreateContact from './pages/CreateContact';
import ContactDetails from './pages/ContactDetails';


const App = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/new" element={<CreateContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;