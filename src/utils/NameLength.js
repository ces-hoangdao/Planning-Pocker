import { NAME_DISPLAY_LENGTH, NAME_DISPLAY_LIMIT } from "../constants/authConst"

const nameLength = (username) => {
  if (username && username.length > NAME_DISPLAY_LIMIT) {
    username = `${username.slice(0, NAME_DISPLAY_LENGTH)}...`
  }
  return username
}

export default nameLength
