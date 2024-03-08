const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide password, name and phone number (or password only to list entries):"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://phonebook:${password}@cluster0.fwso8ka.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && phone) {
  const person = new Person({
    name,
    phone,
  });
  person.save().then(() => {
    console.log(`added ${name} number ${phone} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.map((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
