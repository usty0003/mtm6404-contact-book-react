import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
 } from "@mui/material";

import Loader from "./Loader";
import ContactsBackButton from "./ContactsBackButton";
import { addContact, updateContact, fetchContact } from "../api";

const ContactForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form, setForm] = useState({});

  const loadContact = async () => {
    setIsLoading(true);
    const contactData = await fetchContact(id);

    if (contactData) {
      setForm(contactData);
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    if (isEdit) {
      await updateContact(id, form);
      navigate(`/contact/${id}`);
    } else {
      const {id} = await addContact(form);
      id && navigate(`/contact/${id}`);
    }

    setIsUpdating(false);
  };

  const submitButtonLabel = isEdit ? "Update Contact" : "Add Contact";

  useEffect(() => {
    if (isEdit && id) loadContact();
  }, [isEdit, id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <ContactsBackButton />
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Edit Contact" : "Add New Contact"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Street"
            name="street"
            value={form.street}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Province/State"
            name="province"
            value={form.province}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Postal/ZIP Code"
            name="postal"
            value={form.postal}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          sx={{ mr: 2 }}
          color="primary"
          variant={isUpdating ? "outlined" : "contained"}
        >
          {isUpdating ? <CircularProgress size={24} color="primary" /> : submitButtonLabel}
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;