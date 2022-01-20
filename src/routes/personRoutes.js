const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
    const {name, salary, approved} = req.body

    if (!name) {
        res.status(422).json({error: "O nome é obrigatório!"})
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        // Criando dados
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {
    try {
        // Selecionando todos as pessoas cadastradas
        const people = await Person.find()
        // Enviando em formato JSON
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        // Utilizando o método findOne para encontrar uma pessoa
        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(422).json({message: 'Pessoa não encontrada!'})
            return
        }

        // Enviando em formato JSON
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        // Verificando se o usuário foi encontrado no banco
        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Pessoa não encontrada!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })

    if(!person) {
        res.status(422).json({message: 'Pessoa não encontrada!'})
        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({message: 'Usuário deletado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router
