import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Section } from './Section/Section';
import { Head, SpanFirst, SpanSecond } from './Section/Section.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //збереження контактів до localStorage
  componentDidMount() {
    const LS_KEY = 'contacts';
    const contactsFromLS = localStorage.getItem(LS_KEY);

    if (contactsFromLS)
      this.setState({
        contacts: JSON.parse(contactsFromLS),
      });
  }

  //відображення контактів з localStorage
  componentDidUpdate(_, prevState) {
    const LS_KEY = 'contacts';
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  // додавання нового контакту в список контактів
  createContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };
    //перевірка, чи вже є таке імʼя в списку
    const isContactExist = this.state.contacts.some(
      ({ name }) => name === data.name
    );
    isContactExist
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  //обробка зміни значення фільтру
  handleChangeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  //отримання відфільтрованих контактів
  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  //видалення контакту
  handleDelete = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== userId),
    }));
  };

  render() {
    return (
      <>
        <Section>
          <Head>
            <SpanFirst>Phonebook</SpanFirst>
            <SpanSecond>Phonebook</SpanSecond>
          </Head>
          <ContactForm createContact={this.createContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            handleChangeFilter={this.handleChangeFilter}
          />
          <ContactList
            contacts={this.getFilterContacts()}
            handleDelete={this.handleDelete}
          />
        </Section>
      </>
    );
  }
}
