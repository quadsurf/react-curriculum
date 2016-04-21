const express = require("express");
const router = express.Router();
const knex = require('../db/knex')
require("locus")

router.get('/', (req,res) => {
  knex('todos').then((todos) => {
    res.format({
      'text/html':() =>{
        res.render('')
      },
      'application/json':() =>{
        res.send(todos)
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})


router.post('/', (req,res) => {
  knex('todos').insert(req.body.todo).returning("*").then((todo) => {
    res.format({
      'text/html':() =>{
        res.render('')
      },
      'application/json':() =>{
        res.send(todo)
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})

router.get('/new', (req,res) => {
  res.render('new')
})

router.get('/:id', (req,res) => {
  knex('todos').where({id: req.params.id}).first().then((todo) => {
    res.render("show", {todo})
  });
})

router.get('/:id/edit', (req,res) => {
  knex('todos').where({id: req.params.id}).first().then((todo) => {
    res.render("edit", {todo})
  });
})

router.patch('/:id', (req,res) => {
  knex('todos').where({id: req.params.id}).update(req.body.todo).returning("*").then((data) => {
    res.format({
      'text/html':() =>{
        res.redirect('/')
      },
      'application/json':() =>{
        res.send(data[0])
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})

router.delete('/:id', (req,res) => {
  knex('todos').where({id: req.params.id}).del().returning("*").then((data) => {
    res.format({
      'text/html':() =>{
        res.redirect('/')
      },
      'application/json':() =>{
        res.send(data[0])
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})

module.exports = router;