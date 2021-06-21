export function arrayRemoveDuplicates (arrayValue) {
  return arrayValue.filter((value, index) => {
    return arrayValue.indexOf(value) === index;
  });
}

/*
function arrayRemoveDuplicates (array) {
  // Muito mais veloz em cenários com poucos registros duplicados (é o caso aqui, sempre 1)
  return [...new Set(array)]; // Set não permite valores duplicados
}
*/
