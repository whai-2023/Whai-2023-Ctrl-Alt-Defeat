const express = require('express')
const router = express.Router()
const lib = require('../lib')


router.get('/:id', lib.renderPlaceDetails)

router.get('/:id/edit', lib.renderEditPlaceForm)

router.post('/:id/edit', lib.updatePlace)

module.exports = router