import { createContext, useContext, useEffect, useReducer } from 'react'
import sampleData from '../data/sampleData.json'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1']

function isLocalHost() {
  return LOCAL_HOSTNAMES.includes(window.location.hostname)
}

function getInitialState() {
  if (!isLocalHost()) {
    return structuredClone(sampleData)
  }
  const stored = loadFromStorage()
  if (stored && Array.isArray(stored.boxes) && Array.isArray(stored.history)) {
    return stored
  }
  return structuredClone(sampleData)
}

function reducer(state, action) {
  switch (action.type) {
    case 'REPLACE_ALL': {
      return {
        version: action.payload.version ?? 1,
        boxes: action.payload.boxes ?? [],
        history: action.payload.history ?? [],
      }
    }
    case 'MERGE_ALL': {
      const existingBoxIds = new Set(state.boxes.map((box) => box.id))
      const newBoxes = (action.payload.boxes ?? []).filter(
        (box) => !existingBoxIds.has(box.id),
      )
      const existingHistoryIds = new Set(state.history.map((h) => h.id))
      const newHistory = (action.payload.history ?? []).filter(
        (h) => !existingHistoryIds.has(h.id),
      )
      return {
        ...state,
        boxes: [...state.boxes, ...newBoxes],
        history: [...newHistory, ...state.history],
      }
    }
    case 'ADD_BOX': {
      return { ...state, boxes: [...state.boxes, action.payload] }
    }
    case 'UPDATE_BOX': {
      return {
        ...state,
        boxes: state.boxes.map((box) =>
          box.id === action.payload.id ? { ...box, ...action.payload.patch } : box,
        ),
      }
    }
    case 'DELETE_BOX': {
      return {
        ...state,
        boxes: state.boxes.filter((box) => box.id !== action.payload.id),
      }
    }
    case 'ADD_ITEM': {
      return {
        ...state,
        boxes: state.boxes.map((box) =>
          box.id === action.payload.boxId
            ? { ...box, items: [...box.items, action.payload.item] }
            : box,
        ),
      }
    }
    case 'UPDATE_ITEM': {
      return {
        ...state,
        boxes: state.boxes.map((box) =>
          box.id === action.payload.boxId
            ? {
                ...box,
                items: box.items.map((item) =>
                  item.id === action.payload.itemId
                    ? { ...item, ...action.payload.patch }
                    : item,
                ),
              }
            : box,
        ),
      }
    }
    case 'DELETE_ITEM': {
      return {
        ...state,
        boxes: state.boxes.map((box) =>
          box.id === action.payload.boxId
            ? { ...box, items: box.items.filter((item) => item.id !== action.payload.itemId) }
            : box,
        ),
      }
    }
    case 'ADD_HISTORY': {
      return { ...state, history: [action.payload, ...state.history] }
    }
    case 'CLEAR_HISTORY': {
      return { ...state, history: [] }
    }
    default:
      return state
  }
}

const GachaContext = createContext(null)

export function GachaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)

  useEffect(() => {
    saveToStorage(state)
  }, [state])

  return (
    <GachaContext.Provider value={{ state, dispatch }}>
      {children}
    </GachaContext.Provider>
  )
}

export function useGachaStore() {
  const context = useContext(GachaContext)
  if (!context) {
    throw new Error('useGachaStore must be used within a GachaProvider')
  }
  return context
}
