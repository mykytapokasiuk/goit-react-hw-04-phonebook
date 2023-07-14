import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm.js';
import Filter from './Filter/Filter.js';
import ContactList from './ContactList/ContactList.js';
import css from './App.module.css';
import { nanoid } from 'nanoid';

const App = () => {
  const parsedContacts = getLocalContacts();
  const [contacts, setContacts] = useState(parsedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  function getLocalContacts() {
    const localContacts = localStorage.getItem('contacts');
    return JSON.parse(localContacts) || [];
  }

  const onAddContact = ({ name, number }) => {
    const isExist = contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const onChangeFilter = event => {
    setFilter(event.target.value);
  };

  const onRemoveContact = contactId =>
    setContacts(() => contacts.filter(contact => contact.id !== contactId));

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.app}>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={onAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={onChangeFilter} />
        {contacts.length === 0 ? (
          <p className={css.contactsEmptyText}>The contact list is empty</p>
        ) : (
          <ContactList
            filteredContacts={filteredContacts}
            onRemoveContact={onRemoveContact}
          />
        )}
      </div>
    </div>
  );
};

export default App;
