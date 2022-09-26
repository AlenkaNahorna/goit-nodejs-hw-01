const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
};

invokeAction(argv);

// invokeAction({ action: "listContacts" });
// invokeAction({ action: "getContactById", id: "2" });
// invokeAction({ action: "removeContact", id: "10" });
// invokeAction({
//   action: "addContact",
//   name: "Olena",
//   email: "olena@gmail.com",
//   phone: "(666) 555-4433",
// });
