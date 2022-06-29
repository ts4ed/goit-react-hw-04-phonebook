import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Phonebook from './Phonebook/Phonebook';
import Filter from './Filter/Filter';
import s from './App.module.css';

// const useLocalStorage = (storageKey, fallbackState) => {
//   const [contacts, setContacts] = useState(
//     () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
//   );

//   useEffect(() => {
//     window.localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   return [contacts, setContacts];
// };

// const [isOpen, setOpen] = useLocalStorage('is-open', false);

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');
  // const [isOpen, setOpen] = useLocalStorage('is-open', false);
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      return alert(`${data.name} уже есть в контактах`);
    }
    setContacts(prevContacts => [data, ...prevContacts]);
  };
  const changeFilter = e => setFilter(e.currentTarget.value);

  const onDeleteContact = idContact => {
    setContacts(contacts.filter(contact => contact.id !== idContact));
  };

  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmitData={addContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Phonebook
        contacts={getVisibleContact()}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}
