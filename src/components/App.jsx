import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { saveLocalStorage, loadLocalStorage } from './Utils/localStorage';


const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return loadLocalStorage(CONTACTS_KEY) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveLocalStorage(CONTACTS_KEY, contacts);
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.some(({ name }) => name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = userId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== userId)
    );
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const getFilterContacts = () => {
    const filterlowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterlowerCase)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />

        <ContactList
          contacts={getFilterContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};