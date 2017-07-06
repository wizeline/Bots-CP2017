
const Wit = require('node-wit').Wit;

// Threshold to consider an entity as valid
const THRESHOLD = 0.66;

class WitControler {
  constructor(token) {
    this.wit = new Wit({
      accessToken: token,
    });
  }

  /**
  * Process the messages coming from the NLP processor and return with
  * the generic format
  *
  * @param  {string} message:         A message array coming from the NLP
  * @return Wit API response:         The messages with the generic format
  * */
  processMessage(message) {
    return this.wit.message(message, {});
  }

  /**
   * Process the wit response to a more useful entity map
   * @method getEntities
   * @param  {string}    message The message to be processed
   * @return {Promise<entities>} A promise that resolves to a map of entities
   */
  getEntities(message) {
    return this.processMessage(message)
      .then((witResponse) => {
        const entities = witResponse.entities;
        const flatEntities = {};

        Object.entries(entities).forEach(([entity, values]) => {
          const firstEnt = values[0];
          if (firstEnt.confidence > THRESHOLD) {
            flatEntities[entity] = firstEnt.value;
          }
        });

        return flatEntities;
      });
  }
}

const token = process.env.WIT_ACCESS_TOKEN;
const controller = new WitControler(token);

module.exports = controller;
