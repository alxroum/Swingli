// Simple IndexedDB helper for storing offline rounds
import { openDB } from 'idb'

const DB_NAME = 'golf-db'
const DB_VERSION = 1

export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('rounds')) {
        db.createObjectStore('rounds', { keyPath: 'id', autoIncrement: true })
      }
    },
  })
}

export async function saveOfflineRound(round: any) {
  const db = await getDb()
  await db.add('rounds', { ...round, savedAt: new Date().toISOString() })
}

export async function getOfflineRounds() {
  const db = await getDb()
  return db.getAll('rounds')
}

export async function clearOfflineRounds() {
  const db = await getDb()
  return db.clear('rounds')
}
