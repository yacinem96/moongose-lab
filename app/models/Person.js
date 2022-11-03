const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
}
);

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (newPers, done) => {
  const yacineMan = new Person(newPers);

  yacineMan.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });

};



const createManyRecordsPersons = (tabPers, done) => {

  Person.create(tabPers, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });

};

const SearchPersons = (personName, done) => {

  Person.find({ "name": personName }, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });

};

const SearchOnePerson = (personName, done) => {

  Person.find({ name: personName }, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });

};

const findOneByFood = (food, done) => {
  Person.find({ favoriteFoods: food }, (err, data) => {

    if (err) return done(err)
    done(null, data)
  });
};
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? done(err) : done(null, data));
};


const findAndUpdate = (personName, done)=>{
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { "name": personName },
    { $set: { "age": ageToSet } }, { returnNewDocument: true },
      (err, data) => {
      if (err) {
        console.log("Something wrong when updating record!");
      }
      console.log(data);
    })
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));
};

const removeManyPeople = (nameToRemove, done) => {
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    err ? done(err) : done(null, data)
  }
  )
};




const chainSearchQuery = (foodToSearch, done) => {

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: "desc" }).limit(2).select("-age").exec((err, data) => {
    if (err)
      done(err);
    done(null, data);
  })
};
