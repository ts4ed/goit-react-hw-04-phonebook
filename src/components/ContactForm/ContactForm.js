import { Component } from 'react';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.props.onSubmitData(contact);
    this.reset();
  };

  reset = () => this.setState({ name: '', number: '' });

  render() {
    const { handleSubmit, handleChange } = this;
    const { name, number } = this.state;

    return (
      <div className={s.container}>
        <form type="submit" onSubmit={handleSubmit} className={s.form}>
          <label className={s.input}>
            <span className={s.span}>Name</span>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
              value={name}
            />
          </label>
          <label className={s.input}>
            <span className={s.span}>Number</span>
            <input
              type="tel"
              name="number"
              pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
              value={number}
            />
          </label>

          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};
