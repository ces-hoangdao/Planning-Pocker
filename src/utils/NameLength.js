const nameLength = (username) => {
  if (username && username.length > 12) {
    username = `${username.slice(0, 6)}...`
  }
  return username
}

export default nameLength
