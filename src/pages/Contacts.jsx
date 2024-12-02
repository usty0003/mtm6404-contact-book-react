import React, {useState, useEffect} from 'react';
import {Add} from '@mui/icons-material';
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
} from '@mui/material';

import {fetchContacts} from '../api';
import Loader from '../components/Loader';
import ContactsList from '../components/ContactsList';

const Contacts = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadContacts = async () => {
    const data = await fetchContacts();
    const sortedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
    setContacts(sortedData);
    setIsLoading(false);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    loadContacts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Contacts
        </Typography>
        <Button
          href="/new"
          color="primary"
          variant="contained"
          startIcon={<Add />}
        >
          New Contact
        </Button>
      </Box>

      <TextField
        fullWidth
        sx={{ my: 3 }}
        value={search}
        label="Search"
        variant="outlined"
        onChange={onSearchChange}
      />

      <ContactsList contacts={filteredContacts} />
    </Container>
  )
}

export default Contacts;
