import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";

import { deleteContact, fetchContact } from "../api";
import Loader from "../components/Loader";
import ContactsBackButton from "../components/ContactsBackButton";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadContact = async () => {
    const contactData = await fetchContact(id);
    contactData && setContact(contactData);
    setIsLoading(false);
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteContact(id);
    navigate("/");
    setIsDeleting(false);
  };

  useEffect(() => {
    loadContact();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ContactsBackButton />
        <Box>
          <Button
            sx={{ mr: 2 }}
            color="primary"
            variant="contained"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleDelete}
          >
            {isDeleting ? <CircularProgress size={24} color="secondary" /> : "Delete"}
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" sx={{ mb: 3 }}>
        {contact.firstName} {contact.lastName}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Contact Information:
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </Typography>
          {contact.phone && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Address:
          </Typography>
          {contact.street && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Street:</strong> {contact.street}
            </Typography>
          )}
          {contact.city && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>City:</strong> {contact.city}
            </Typography>
          )}
          {contact.province && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Province/State:</strong> {contact.province}
            </Typography>
          )}
          {contact.postal && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Postal Code:</strong> {contact.postal}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactDetails;