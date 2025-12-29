// src/utils/utils.js
export function createPageUrl(pageName) {
  const pageMap = {
    'Home': '/',
    'Etjanster': '/etjanster',
    'Bibliotek': '/bibliotek',
    'ITSupport': '/it-support',
    'NyStudent': '/ny-student',
    'Campus': '/campus',
    'Schema': '/schema',
    'Felanmalan': '/felanmalan'
  }
  
  return pageMap[pageName] || '/'
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}