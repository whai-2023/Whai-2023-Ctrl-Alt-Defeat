const fs = require('fs/promises')
const path = require('path')


async function getHome(req, res) {
    try {
        const filePath = path.join(__dirname, 'data/data.json')
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const data = JSON.parse(fileContent)

        const viewData = {
            puppies: data.puppies,
        }
        console.log(viewData)
        res.render('home', viewData)
    } catch (error) {
        console.error('Error reading data:', error)
    }
}


async function getPuppyById(puppyId) {
  try {
    const filePath = path.join(__dirname, './data/data.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
  
    const puppy = data.puppies.find(puppy => puppy.id === puppyId)
  
    return puppy
  } catch (error) {
    console.error('Error reading data:', error)
    throw error
  }
}

async function renderPuppyDetails(req, res) {
  try {
    const puppyId = parseInt(req.params.id)
    const puppy = await getPuppyById(puppyId)
  
    if (!puppy) {
      res.send('Puppy not found')
      return
    }
  
    res.render('details', puppy)
  } catch (error) {
    console.error('Error reading data:', error)
    res.send('Error reading data')
  }
}

async function renderEditPuppyForm(req, res) {
  try {
    const puppyId = parseInt(req.params.id)
    const puppy = await getPuppyById(puppyId)
  
    if (!puppy) {
      res.send('Puppy not found')
      return
    }
  
    res.render('edit', puppy)
  } catch (error) {
    console.error('Error reading data:', error)
    res.send('Error reading data')
  }
}

async function updatePuppy(req, res) {
  try {
    const puppyId = parseInt(req.params.id)
    const updatedPuppy = req.body

    const filePath = path.join(__dirname, './data/data.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    const puppyIndex = data.puppies.findIndex(puppy => puppy.id === puppyId)

    if (puppyIndex === -1) {
      res.send('Puppy not found')
      return
    }

    data.puppies[puppyIndex] = {
      ...data.puppies[puppyIndex],
      ...updatedPuppy
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2))

    res.redirect(`/puppies/${puppyId}`)
  } catch (error) {
    console.error('Error reading data:', error)
    res.send('Error reading data')
  }
}

module.exports = {
  renderPuppyDetails,
  renderEditPuppyForm,
  updatePuppy,
  getHome
}
