import PropTypes from 'prop-types';
import { Item, Button } from './ContactListItem.styled';

const ContactsListItem = ({ id, name, number, handleDelete }) => {
  return (
    <Item key={id}>
      <p>
        {name} : <span>{number}</span>
      </p>
      <Button type="button" onClick={() => handleDelete(id)}>
        Delete
      </Button>
    </Item>
  );
};

ContactsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactsListItem;
