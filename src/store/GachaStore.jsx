import { createContext, useContext, useReducer } from 'react'
import defaultData from '../data/defaultData'
import { importImages } from '../utils/exportImport'
import { DEFAULT_ENHANCEMENT_MULTIPLIERS } from '../utils/price'

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1']

export function isLocalHost() {
  return LOCAL_HOSTNAMES.includes(window.location.hostname)
}

function getInitialState() {
  importImages(defaultData.images)
  return structuredClone(defaultData)
}

function reducer(state, action) {
  switch (action.type) {
    case 'REPLACE_ALL': {
      return {
        version: action.payload.version ?? 1,
        boxes: action.payload.boxes ?? [],
        shops: action.payload.shops ?? [],
        campaigns: action.payload.campaigns ?? [],
        users: action.payload.users ?? [],
        partyTags: action.payload.partyTags ?? [],
        characters: action.payload.characters ?? [],
        enhancementMultipliers: action.payload.enhancementMultipliers ?? DEFAULT_ENHANCEMENT_MULTIPLIERS,
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
      const existingCampaignIds = new Set((state.campaigns ?? []).map((c) => c.id))
      const newCampaigns = (action.payload.campaigns ?? []).filter(
        (c) => !existingCampaignIds.has(c.id),
      )
      const existingUserIds = new Set((state.users ?? []).map((u) => u.id))
      const newUsers = (action.payload.users ?? []).filter(
        (u) => !existingUserIds.has(u.id),
      )
      const existingPartyTagIds = new Set((state.partyTags ?? []).map((t) => t.id))
      const newPartyTags = (action.payload.partyTags ?? []).filter(
        (t) => !existingPartyTagIds.has(t.id),
      )
      const existingCharacterIds = new Set((state.characters ?? []).map((c) => c.id))
      const newCharacters = (action.payload.characters ?? []).filter(
        (c) => !existingCharacterIds.has(c.id),
      )
      return {
        ...state,
        boxes: [...state.boxes, ...newBoxes],
        shops: [...(state.shops ?? []), ...newShops],
        campaigns: [...(state.campaigns ?? []), ...newCampaigns],
        users: [...(state.users ?? []), ...newUsers],
        partyTags: [...(state.partyTags ?? []), ...newPartyTags],
        characters: [...(state.characters ?? []), ...newCharacters],
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
    case 'ADD_CAMPAIGN': {
      return { ...state, campaigns: [...(state.campaigns ?? []), action.payload] }
    }
    case 'UPDATE_CAMPAIGN': {
      return {
        ...state,
        campaigns: (state.campaigns ?? []).map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.patch } : c,
        ),
      }
    }
    case 'DELETE_CAMPAIGN': {
      return {
        ...state,
        campaigns: (state.campaigns ?? []).filter((c) => c.id !== action.payload.id),
      }
    }
    case 'ADD_USER': {
      return { ...state, users: [...(state.users ?? []), action.payload] }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        users: (state.users ?? []).map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload.patch } : u,
        ),
      }
    }
    case 'DELETE_USER': {
      return {
        ...state,
        users: (state.users ?? []).filter((u) => u.id !== action.payload.id),
      }
    }
    case 'ADD_PARTY_TAG': {
      return { ...state, partyTags: [...(state.partyTags ?? []), action.payload] }
    }
    case 'UPDATE_PARTY_TAG': {
      return {
        ...state,
        partyTags: (state.partyTags ?? []).map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.patch } : t,
        ),
      }
    }
    case 'DELETE_PARTY_TAG': {
      return {
        ...state,
        partyTags: (state.partyTags ?? []).filter((t) => t.id !== action.payload.id),
      }
    }
    case 'ADD_CHARACTER': {
      return { ...state, characters: [...(state.characters ?? []), action.payload] }
    }
    case 'UPDATE_CHARACTER': {
      return {
        ...state,
        characters: (state.characters ?? []).map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.patch } : c,
        ),
      }
    }
    case 'DELETE_CHARACTER': {
      return {
        ...state,
        characters: (state.characters ?? []).filter((c) => c.id !== action.payload.id),
      }
    }
    default:
      return state
  }
}

const GachaContext = createContext(null)

export function GachaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)

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
