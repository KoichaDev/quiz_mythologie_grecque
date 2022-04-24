// Toggling the className for the specific element
export const toggleClassName = (token, className) => {
    token.classList.toggle(className);
}

export const replaceClassName = (token, oldToken, newToken) => {
    return token.classList.replace(oldToken, newToken);
}
