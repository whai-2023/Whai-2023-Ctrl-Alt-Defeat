const express = require('express')
const router = express.Router()
const lib = require('../lib')


router.get('/:id', lib.renderPuppyDetails)

router.get('/:id/edit', lib.renderEditPuppyForm)

router.post('/:id/edit', lib.updatePuppy)

module.exports = router