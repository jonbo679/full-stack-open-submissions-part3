const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

app.use(cors());
app.use(express.json());
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook info for ${persons.length} people </p>
    <p>${new Date()}</p>`);
})

app.get('/readme', (req, res) => {
    res.send(readme.md);
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => {
        return person.id !== id;
    })
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;
    if (!newPerson.number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }
    if (!newPerson.name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }
    if (persons.find(person => person.name === newPerson.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    newPerson.id = Math.floor(Math.random() * 100000);
    persons = persons.concat(newPerson);
    res.json(newPerson);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})