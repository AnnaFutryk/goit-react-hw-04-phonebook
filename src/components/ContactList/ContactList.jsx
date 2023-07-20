import PropTypes from 'prop-types';
import ContactsListItem from 'components/ContactListItem/ContactListItem';
import { List } from './ContactList.styled';

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <List>
      {contacts.map(({ name, number, id }) => (
        <ContactsListItem
          key={id}
          id={id}
          name={name}
          number={number}
          handleDelete={handleDelete}
        />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default ContactList;
