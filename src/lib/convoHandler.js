
const pokedex = require('../controllers/pokeapi');

const GREETINGS = ['hi', 'hey', 'hola', 'que onda', 'howdy'];

const isGreeting = term => GREETINGS.includes(term.toLowerCase());

const getByName = term => pokedex.getPokemonByName(term)
    .then((pokemon) => {
      const { name, weight, height, base_experience: baseXp } = pokemon;

      const message = `
        Pokemon name: ${name}
        Weight: ${weight}
        Height: ${height}
        Base XP: ${baseXp}
      `;

      console.log(message);

      return message;
    })
    .catch(error => 'I\'m sorry, but that pokemon doesn\'t exist. 😟');

const process = (name) => {
  if (isGreeting(name)) {
    return Promise.resolve('Hi! 👋🏼');
  }

  return getByName(name)
    .catch(err => 'Something went wrong, I\'m so sorry');
};

module.exports = {
  process,
};
