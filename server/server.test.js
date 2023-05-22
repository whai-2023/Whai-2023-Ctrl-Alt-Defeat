//martin-corpus-whai-23 — Today at 11:13 AM
const request = require('supertest')
const server = require('./server')

const { screen } = require('@testing-library/dom')

require('@testing-library/jest-dom')

describe('Artwork Summary', () => {
  it('should generate correct HTML for each artwork', async () => {
    const data = require('/data/data.json')

    const expectedHtml = [
      '<a href="/public/images/fiji-islands.jpg">fiji islands</a> ',
      '<a href="/public/images/">paros_.jpeg">paros,greece </a> ',
      '<a href="/public/images/nias-indo-barrel.jpg">nias</a> ',
      '<a href="/public/images/NZ-Quenstown.jpg">fiji islands</a> ',
      '<a href="/public/images/PI.jpg">fiji islands</a> ',
      '<a href="/public/images/mars.jpg.jpg">fiji islands</a> ',
    ]

    const response = await request(server).get('/')

    document.body.innerHTML = response.text

    const listItems = Array.from(document.querySelectorAll('li'))

    const generatedHtml = listItems.map((item) => item.innerHTML)

    expect(generatedHtml).toEqual(expectedHtml)
  })
})
