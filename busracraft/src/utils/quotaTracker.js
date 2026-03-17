import { DAILY_LIMITS } from './constants'

function getTodayKey() {
  return `quota_${new Date().toISOString().slice(0, 10)}`
}

function getCounters() {
  const key = getTodayKey()
  const stored = localStorage.getItem(key)
  if (stored) return JSON.parse(stored)
  return { reads: 0, writes: 0 }
}

function saveCounters(counters) {
  const key = getTodayKey()
  localStorage.setItem(key, JSON.stringify(counters))
}

export function trackRead(count = 1) {
  const counters = getCounters()
  counters.reads += count
  saveCounters(counters)
}

export function trackWrite(count = 1) {
  const counters = getCounters()
  counters.writes += count
  saveCounters(counters)
}

export function getQuotaStatus() {
  const counters = getCounters()
  return {
    reads: counters.reads,
    writes: counters.writes,
    readPercent: Math.round((counters.reads / DAILY_LIMITS.reads) * 100),
    writePercent: Math.round((counters.writes / DAILY_LIMITS.writes) * 100),
    isReadWarning: counters.reads > DAILY_LIMITS.reads * 0.8,
    isWriteWarning: counters.writes > DAILY_LIMITS.writes * 0.8,
    isReadExceeded: counters.reads >= DAILY_LIMITS.reads,
    isWriteExceeded: counters.writes >= DAILY_LIMITS.writes,
  }
}
