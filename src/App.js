import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import FormContact from "./components/FormContact/FormContact";
import Filter from "./components/Filter/Filter";
import ListContact from "./components/ListContact/ListContact";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    try {
      const savedContacts = localStorage.getItem("contacts");
      if (savedContacts) {
        this.setState({ contacts: JSON.parse(savedContacts) });
      }
    } catch (error) {}
  }
  componentDidUpdate() {}

  addContact = (name, number) => {
    const sameContact = this.state.contacts.find(
      (contact) => contact.name === name
    );
    if (sameContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contacts = [...this.state.contacts, { id: uuidv4(), name, number }];
    this.setState({
      contacts,
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  deleteContact = (id) => {
    const contactIndex = this.state.contacts.findIndex(
      ({ id: contactId }) => contactId === id
    );
    const contacts = [...this.state.contacts];
    contacts.splice(contactIndex, 1);
    this.setState({ contacts });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  onFilter = (value) => {
    this.setState({ filter: value });
  };

  filteredArray = () => {
    const filterBy = this.state.filter.toLowerCase();
    return this.state.filter
      ? this.state.contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filterBy)
        )
      : this.state.contacts;
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <FormContact addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} value={this.state.filter} />
        <ListContact
          contacts={this.filteredArray(this.state.contacts)}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
