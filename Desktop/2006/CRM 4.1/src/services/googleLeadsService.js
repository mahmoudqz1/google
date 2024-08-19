// src/services/googleLeadsService.js

const API_URL = 'https://script.google.com/macros/s/AKfycbz57DqbWvwTIv2W3MP7iKDyl_Te6e3sv5JFOtIVZ0yq1wd80AWU39EuLypXhL3yrI82/exec'

export const fetchGoogleLeads = () => {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok)
        throw new Error(`Network response was not ok ${response.statusText}`)

      return response.json()
    })
    .catch(error => {
      console.error('Error fetching Google leads:', error)
      throw error
    })
}
