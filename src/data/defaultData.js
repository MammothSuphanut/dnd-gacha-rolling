import background from './background.json'
import classes from './classes.json'
import species from './species.json'
import shops from './shops.json'
import campaigns from './campaigns.json'
import users from './users.json'
import partyTags from './partyTags.json'
import characters from './characters.json'
import images from './images.json'

export default {
  version: 1,
  boxes: [...background, ...classes, ...species],
  shops,
  campaigns,
  users,
  partyTags,
  characters,
  images,
}
