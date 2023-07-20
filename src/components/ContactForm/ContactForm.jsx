import { Component } from 'react';
import { Button, Form, Input, Label } from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // зміна значень інпутів
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  //відправка форми
  handleSubmit = event => {
    event.preventDefault();

    //виклик з App з передачею нового контакту
    const { createContact } = this.props;
    createContact({
      name: this.state.name,
      number: this.state.number,
    });

    //повернення інпутів до дефолтного значення
    this.reset();
  };

  //повернення інпутів до дефолтного значення
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit" disabled={!name || !number}>
          Add contact
        </Button>
      </Form>
    );
  }
}

export default ContactForm;
