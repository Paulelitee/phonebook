const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const password = process.env.PASSWORD
const url = process.env.MONGODB_URI

console.log(password)
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MONGODB')
    })
    .catch((error) => {
        console.log('error connecting to MONGODB: ', error.message)
        console.log(url)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

    
