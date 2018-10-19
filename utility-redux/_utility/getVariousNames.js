const pluralizeWord = word => (word[word.length - 1] === 'y' ? `${word.slice(0, -1)}ies` : `${word}s`);
const capitalizeWord = word => word.toUpperCase()[0] + word.slice(1);

module.exports = (apiNameSnake) => {
  const apiNameCamel = apiNameSnake.indexOf('_') > -1 ? apiNameSnake.split('_')[0] + capitalizeWord(apiNameSnake.split('_')[1]) : apiNameSnake;
  const apiNameCamelPlural = pluralizeWord(apiNameCamel);
  const capitalizedNameCamel = capitalizeWord(apiNameCamel);
  const capitalizedNameSnakePlural = pluralizeWord(apiNameSnake).toUpperCase();
  const capitalizedNameSnake = apiNameSnake.toUpperCase();

  return {
    apiNameCamel,
    apiNameCamelPlural,
    capitalizedNameCamel,
    capitalizedNameSnakePlural,
    capitalizedNameSnake,
    modelName: apiNameCamel
  };
};
