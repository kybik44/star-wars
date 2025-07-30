import { http, HttpResponse } from 'msw'
import { characters, films, planets, species, starships, vehicles } from './data'

const baseUrl = 'https://swapi.dev/api'

export const handlers = [
  // Characters
  http.get(`${baseUrl}/people`, () => {
    return HttpResponse.json({
      count: characters.length,
      next: null,
      previous: null,
      results: characters,
    })
  }),

  http.get(`${baseUrl}/people/:id`, ({ params }) => {
    const id = params.id as string
    const character = characters.find(char => char.url.includes(`/people/${id}/`))
    
    if (!character) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(character)
  }),

  // Films
  http.get(`${baseUrl}/films`, () => {
    return HttpResponse.json({
      count: films.length,
      next: null,
      previous: null,
      results: films,
    })
  }),

  http.get(`${baseUrl}/films/:id`, ({ params }) => {
    const id = params.id as string
    const film = films.find(f => f.url.includes(`/films/${id}/`))
    
    if (!film) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(film)
  }),

  // Planets
  http.get(`${baseUrl}/planets`, () => {
    return HttpResponse.json({
      count: planets.length,
      next: null,
      previous: null,
      results: planets,
    })
  }),

  http.get(`${baseUrl}/planets/:id`, ({ params }) => {
    const id = params.id as string
    const planet = planets.find(p => p.url.includes(`/planets/${id}/`))
    
    if (!planet) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(planet)
  }),

  // Species
  http.get(`${baseUrl}/species`, () => {
    return HttpResponse.json({
      count: species.length,
      next: null,
      previous: null,
      results: species,
    })
  }),

  http.get(`${baseUrl}/species/:id`, ({ params }) => {
    const id = params.id as string
    const specie = species.find(s => s.url.includes(`/species/${id}/`))
    
    if (!specie) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(specie)
  }),

  // Starships
  http.get(`${baseUrl}/starships`, () => {
    return HttpResponse.json({
      count: starships.length,
      next: null,
      previous: null,
      results: starships,
    })
  }),

  http.get(`${baseUrl}/starships/:id`, ({ params }) => {
    const id = params.id as string
    const starship = starships.find(s => s.url.includes(`/starships/${id}/`))
    
    if (!starship) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(starship)
  }),

  // Vehicles
  http.get(`${baseUrl}/vehicles`, () => {
    return HttpResponse.json({
      count: vehicles.length,
      next: null,
      previous: null,
      results: vehicles,
    })
  }),

  http.get(`${baseUrl}/vehicles/:id`, ({ params }) => {
    const id = params.id as string
    const vehicle = vehicles.find(v => v.url.includes(`/vehicles/${id}/`))
    
    if (!vehicle) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(vehicle)
  }),
] 