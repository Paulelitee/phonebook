require('dotenv').config()
const express  = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/phonebook')
const { isWindows } = require('nodemon/lib/utils')

const personsURL = '/api/persons'   

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const persons = [
    {
        name: 'Honour',
        number: '09099523919'
    }
]

//fetching all persons from database
app.get(personsURL, (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
        console.log('working')
    })
    .catch(error => {
        console.log('Error getting this items: ', error.message)
    })
})

//getting a sing;e person
app.get(`${personsURL}/:id`, (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person)  {
            response.json(person)
        }   else     {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

//getting all people from the info route
app.get('/info', (request, response) => {
    Person.find({}).then(person => {
        response.send(person)
    })
    .catch(error => {
        console.log('Error displaying info: ', error.message)
    })
})

//posting to database
app.post(personsURL, (request, response, next) => {

    const body =  request.body

    if(body.name === undefined) {
        isWindows.alert('...')
    }

    const person = new Person({
       name: body.name,
       number: body.number 
    })

    person.save()
    .then(newPerson => {
        response.json(newPerson)
        console.log("note saved")
    })
    .catch(error => next(error))
})

//deleting from database
app.delete(`${personsURL}/:id`,  (request, response) => {
    const params_id = request.params.id

    Person.deleteOne({ _id: params_id})
    .then(result => console.log(result))
    .catch(error => {
        console.log('Error saving this item: ', error.message)
    })
})

//updating a document in the database
app.put(`${personsURL}/:id`, (request, response) => {
    const params_id = request.params.id
    console.log(params_id)
    const body = request.body
    response.json(body)

    Person.updateOne( {_id: params_id}, {number: body.number} )
        .then(result => {
            console.log(`updating ${body.name}`)
            mongoose.disconnect()
        })
        .catch(error => {
            console.log('Error saving this item: ', error.message)
        })
    
})

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'the link does not exist'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError')    {
        return response.status(400).send({ error: 'malformatted id' })
    }   else if (error.name === 'ValidationError') {   
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(    `Server is running on port ${PORT}`)
})