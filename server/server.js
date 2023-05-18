const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')
const path = require('path')
const puppyRoutes = require('./routes/puppies')

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

const lib = require('./lib')

server.get('/', lib.getHome)


server.use('/puppies', puppyRoutes)

module.exports = server

