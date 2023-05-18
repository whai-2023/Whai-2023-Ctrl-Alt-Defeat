const express = require('express')
const router = express.Router()
const lib = require('../lib')


router.post('/:name/edit', lib.updatePlace)

router.get('/:name/edit', lib.renderEditPlaceForm)

router.get('/:name', lib.renderPlaceDetails)



module.exports = router