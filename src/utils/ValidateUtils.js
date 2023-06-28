export const validateUserName = (userName) => userName.trim() !== ""

export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/
  return regex.test(email)
}

export const validatePassword = (password) => password.length > 7

export const validateConfirmPassword = (confirmPassword, password) =>
  confirmPassword === password && confirmPassword !== ""
