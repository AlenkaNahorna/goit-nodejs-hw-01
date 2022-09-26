const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return deleteContact;
};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(4),
    ...data,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
