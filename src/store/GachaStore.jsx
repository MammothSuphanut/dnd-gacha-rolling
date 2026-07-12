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
  if (stored && Array.isArray(stored.boxes)) {
    return { shops: [], ...stored }
  }
  return structuredClone(sampleData)
}

function reducer(state, action) {
  switch (action.type) {
    case 'REPLACE_ALL': {
      return {
        version: action.payload.version ?? 1,
        boxes: action.payload.boxes ?? [],
        shops: action.payload.shops ?? [],
      }
    }
    case 'MERGE_ALL': {
      const existingBoxIds = new Set(state.boxes.map((box) => box.id))
      const newBoxes = (action.payload.boxes ?? []).filter(
        (box) => !existingBoxIds.has(box.id),
      )
      const existingShopIds = new Set((state.shops ?? []).map((shop) => shop.id))
      const newShops = (action.payload.shops ?? []).filter(
        (shop) => !existingShopIds.has(shop.id),
      )
      return {
        ...state,
        boxes: [...state.boxes, ...newBoxes],
        shops: [...(state.shops ?? []), ...newShops],
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
    case 'ADD_SHOP': {
      return { ...state, shops: [...(state.shops ?? []), action.payload] }
    }
    case 'UPDATE_SHOP': {
      return {
        ...state,
        shops: (state.shops ?? []).map((shop) =>
          shop.id === action.payload.id ? { ...shop, ...action.payload.patch } : shop,
        ),
      }
    }
    case 'DELETE_SHOP': {
      return {
        ...state,
        shops: (state.shops ?? []).filter((shop) => shop.id !== action.payload.id),
      }
    }
    case 'ADD_SHOP_ITEM': {
      return {
        ...state,
        shops: (state.shops ?? []).map((shop) =>
          shop.id === action.payload.shopId
            ? { ...shop, items: [...shop.items, action.payload.item] }
            : shop,
        ),
      }
    }
    case 'UPDATE_SHOP_ITEM': {
      return {
        ...state,
        shops: (state.shops ?? []).map((shop) =>
          shop.id === action.payload.shopId
            ? {
                ...shop,
                items: shop.items.map((item) =>
                  item.id === action.payload.itemId
                    ? { ...item, ...action.payload.patch }
                    : item,
                ),
              }
            : shop,
        ),
      }
    }
    case 'DELETE_SHOP_ITEM': {
      return {
        ...state,
        shops: (state.shops ?? []).map((shop) =>
          shop.id === action.payload.shopId
            ? { ...shop, items: shop.items.filter((item) => item.id !== action.payload.itemId) }
            : shop,
        ),
      }
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
