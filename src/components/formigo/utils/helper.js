export function resolveGroupRows (quantity) {
  return Array.from(Array(quantity).keys());
}

export function resolveInputValue (value, emptyValue = '') {
  const resolvedValue = value === null || typeof value === 'undefined' ? emptyValue : value;
  // Booleano precisa resolver inteiro 0/1 porque false num hidden, por exemplo vai como 'false' que o php considera true
  return typeof resolvedValue === 'boolean' ? +resolvedValue : resolvedValue;
}
