import React from 'react';
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const ContactsBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ mb: 2 }}
      color="primary"
      variant="outlined"
      startIcon={<ArrowBack />}
      onClick={() => navigate("/")}
    >
      Contacts
    </Button>
  )
}

export default ContactsBackButton;