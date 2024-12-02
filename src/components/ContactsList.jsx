import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const ContactsList = ({ contacts }) => {
  if (!contacts.length) {
    return (
      <Typography variant="h6" align="center" color="textSecondary">
        No contacts available.
      </Typography>
    );
  }

  return (
    <List>
      {contacts.map((contact, index) => (
        <React.Fragment key={contact.id}>
          <ListItem
            button
            component={Link}
            to={`/contact/${contact.id}`}
            sx={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}
          >
            <ListItemText
              secondary={contact.email}
              primary={`${contact.firstName} ${contact.lastName}`}
            />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}

export default ContactsList;
