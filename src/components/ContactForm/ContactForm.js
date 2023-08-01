import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const [state, setState] = useState({ name: '', number: '' });
  const contactNameId = useId();
  const contactNumberId = useId();

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onAddContact(state);
    reset();
  };

  const reset = () => {
    setState(() => ({ name: '', number: '' }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.contactForm}>
        <label htmlFor={contactNameId}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={state.name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          id={contactNameId}
          onChange={handleChange}
          required
        />
        <label htmlFor={contactNumberId}>Number</label>
        <input
          type="tel"
          name="number"
          placeholder="Enter your phone"
          value={state.number}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          id={contactNumberId}
          onChange={handleChange}
          required
        />
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
