import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Phonebook from './Phonebook/Phonebook';
// import Contacts from '../../src/contacts.json';
import Filter from './Filter/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const ParseContacts = JSON.parse(contacts);

    if (ParseContacts) {
      this.setState({ contacts: ParseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    const suitableEl = this.state.contacts.some(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (suitableEl) {
      return alert(`${data.name} уже есть в контактах`);
    }
    this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
    }));
  };

  setFilterToState = filterData =>
    this.setState({ ...this.state, filter: `${filterData}` });

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  changeFilter = e => this.setState({ filter: e.currentTarget.value });

  onDeleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  render() {
    const {
      formSubmitHandler,
      changeFilter,
      onDeleteContact,
      getVisibleContact,
    } = this;
    const { filter } = this.state;

    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmitData={formSubmitHandler} />
        <h2 className={s.title}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <Phonebook
          contacts={getVisibleContact()}
          onDeleteContact={onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
