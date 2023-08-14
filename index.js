const express  = require('express')
const app = express()
const cors = require('cors')
const personsURL = '/api/persons'

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const generateId = () => {
    return newRandomNumber = Math.floor(Math.random() * 1000)   
}

let persons = [
    {
        name: "Paul Honour",
        number: "0901 603 6812",
        id: generateId()
        }
]

app.get('/', (request, response) => {
    response.json(persons)
})

app.get(personsURL, (request, response) => {
    response.send(persons)
})

app.post(personsURL, (request, response) => {

    const body =  request.body
    body.id = generateId()
    response.send([persons])

    persons = persons.concat(body)
})

app.delete(`${personsURL}/:id`, (request, response) => {
    const params_id = Number(request.params.id)

    persons = persons.filter(person => person.id !== params_id)
   
    response.status(204).end()
    console.log('deleting...')

})


app.put(`${personsURL}/:id`, (request, response) => {

    const id = Number(request.params.id)
    const body = request.body
    response.json(body)

    persons = persons.map(person => person.id === id ? body : person)
})
 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(    `Server is running on port ${PORT}`)
})