const fs = require('fs/promises')
const path = require('path')


async function getHome(req, res) {
    try {
        const filePath = path.join(__dirname, 'data/data.json')
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const data = JSON.parse(fileContent)

        const viewData = {
            places: data.places,
        }
        console.log(viewData)
        res.render('home', viewData)
    } catch (error) {
        console.error('Error reading data:', error)
    }
}


async function getPlaceById(placeId) {
  try {
    const filePath = path.join(__dirname, './data/data.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
  
    const place = data.places.find(place => place.id === placeId)
  
    return place
  } catch (error) {
    console.error('Error reading data:', error)
    throw error
  }
}

async function renderPlaceDetails(req, res) {
  try {
    const placeId = parseInt(req.params.id)
    const place = await getPlaceById(placeId)
  
    if (!place) {
      res.send('Place not found')
      return
    }
  
    res.render('details', place)
  } catch (error) {
    console.error('Error reading data:', error)
    res.send('Error reading data')
  }
}

async function renderEditPlaceForm(req, res) {
  try {
    const placeId = parseInt(req.params.id)
    const place = await getPlaceById(placeId)
  
    if (!place) {
      res.send('Place not found')
      return
    }
  
    res.render('edit', place)
  } catch (error) {
    console.error('Error reading data:', error)
    res.send('Error reading data')
  }
}

async function updatePlace(req, res) {
  try {
    const placeId = parseInt(req.params.id)
    const updatedPlace = req.body

    const filePath = path.join(__dirname, './data/data.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    const placeIndex = data.places.findIndex(place => place.id === placeId)

    if (placeIndex === -1) {
      res.send('Place not found')
      return
    }

    data.places[placeIndex] = {
      ...data.places[placeIndex],
      ...updatedPlace
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2))

    res.redirect(`/places/${placeId}`)
  } catch (error) {
    console.error('Error reading data:', error)
    res.send('Error reading data')
  }
}

module.exports = {
  renderPlaceDetails,
  renderEditPlaceForm,
  updatePlace,
  getHome
}
