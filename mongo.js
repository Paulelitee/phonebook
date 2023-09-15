const mongoose = require("mongoose")

const password = process.argv[2]

const url = `mongodb+srv://paulelite:${password}@cluster0.bugt6sy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'too short'],
        required: true
    },
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: 'Elijah',
    number: '142-347328'
})

// person.save().then(result => {
//     console.log('person saved')
//     mongoose.connection.close()
// })

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name)
    })
    mongoose.connection.close()
})

