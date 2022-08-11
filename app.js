const express = require('express');
const { required } = require('joi');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 5500;

app.use(express.json());

const genres = [
    {id : 1, genretype : 'horror', title : 'Horror'},
    {id : 2, genretype : 'comedy', title : 'Piral'},
    {id : 3, genretype : 'action', title : 'Dinosaur'},
    {id : 4, genretype : 'adventure', title : 'Journal'},
    {id : 5, genretype : 'romance', title : 'Art'},
]


app.get('/', (req, res) => {
    res.status(200).send("Welcome to Vidly")
})

app.get('/api/genres', (req, res) => {
    res.status(200).send(genres);
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find((g) =>  g.id === parseInt(req.params.id))
    if (!genre) res.status(404).send("Genre with the given id not found")
    else return res.status(200).send(genre);
})

app.post('/api/genres', (req, res) => {
    const genre = {
        id: genres.length+1,
        genreType: req.body.genreType,
        title : req.body.title
    }
    const {error, value} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    else {
        genres.push(genre)
        return res.status(200).send(value);
    }
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("The given genre id is not found in record")
    const {error, value} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    else {
        genre.genretype = req.body.genreType
        genre.title = req.body.title
        return res.status(200).send(value);
    }
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("The given genre id is not found in record")
    else {
        const index = genres.indexOf(genre)
        genres.splice(index,1)
        return res.status(200).send(genre);
    }
})

function validateGenre(genre) {
    const schema = Joi.object({
        genreType: Joi.string().alphanum().min(3).required(),
        title: Joi.string().min(5).required()        
    })

    const validResult = schema.validate(genre);

    return validResult
}

app.listen(port, () =>"Listening on port" + port + "...");  