export const createElement = (tokenName) => {
    return document.createElement(tokenName)
}

export const setNodeTextContent = (token, value) => {
    return token.textContent = value
}

export const setNodeAttribute = (token, attributeType, value) => {
    return token.setAttribute(attributeType, value)
}

export const setParentAppendChild = (parent, child) => {
    return parent.appendChild(child)
}