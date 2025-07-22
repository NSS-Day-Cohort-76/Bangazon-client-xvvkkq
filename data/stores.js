import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getStores() {
  return fetchWithResponse('stores', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getStoreById(id) {
  return fetchWithResponse(`stores/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function addStore(store) {
  return fetchWithResponse(`stores`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(store)
  })
}

export function editStore(store) {
  return fetchWithoutResponse(`stores/${store.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(store)
  })
}

export function favoriteStore(storeId) {
  return fetchWithoutResponse(`profile/favoritesellers`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
     },
    body: JSON.stringify({ store_id: storeId })
  })
}

export function unfavoriteStore(storeId) {
  return fetchWithoutResponse(`stores/${storeId}/unfavorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
}
