import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Section } from './Section/Section';
import { Head, SpanFirst, SpanSecond } from './Section/Section.styled';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  // початкове значення приходить зі сховища, а якщо його нема, то initialContacts
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
    );
  });
  const [filter, setFilter] = useState('');

  //відображення контактів з localStorage
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // додавання нового контакту в список контактів
  const createContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };
    //перевірка, чи вже є таке імʼя в списку
    const isContactExist = contacts.some(({ name }) => name === data.name);
    isContactExist
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, newContact]);
  };

  //обробка зміни значення фільтру
  const handleChangeFilter = ({ target }) => {
    setFilter(target.value.trim());
  };

  //отримання відфільтрованих контактів
  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  //видалення контакту
  const handleDelete = userId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== userId)
    );
  };

  return (
    <>
      <Section>
        <Head>
          <SpanFirst>Phonebook</SpanFirst>
          <SpanSecond>Phonebook</SpanSecond>
        </Head>
        <ContactForm createContact={createContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />
        <ContactList
          contacts={getFilterContacts()}
          handleDelete={handleDelete}
        />
      </Section>
    </>
  );
};
