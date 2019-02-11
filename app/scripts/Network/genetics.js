import {default as Network} from '@/Network/NEAT.js';
import {arrayCopy} from '@/Network/connection.js';
import {Species} from '@/Network/species.js';

const nb_inputs  = 5;
const nb_outputs = 3;

export function Unit() {
  this.brain = new Network(nb_inputs, nb_outputs, false);
}

export function Population(size) {
  this.size = size; // Number of players.
  this.best_player; // Best player ever.
  this.best_score = 0;
  this.generation = 0;
  this.population_lifetime = 0;
  this.population = []; // All the players.
  this.innovation_history = []; // History of the innovations.
  this.generation_players = [];
  this.species = [];

  for (let i = 0; i < size; i++) {
    this.population.push(new Unit());
    this.population[i].brain.addConnection(this.innovation_history);
    this.population[i].brain.createNetwork();
  }

  this.speciate = function() {
    for (let i = 0; i < this.species.length; i++) {
      this.species[i].players = [];
    }
    for (let i = 0; i < this.population.length; i++) {
      var species_found = false;
      for (var j = 0; j < this.species.length; j++) {
        if (this.species[j].areSameSpecies(this.population[i].brain)) {
          this.species[j].addToSpecies(this.population[i]);
          species_found = true;
          break;
        }
      }
      if (!species_found) {
        this.species.push(new Species(this.population[i]));
      }
    }
  };
}

Population.prototype.calculateFitness = function() {
  for (let i = 1; i < this.population.length; i++) {
    this.population[i].calculateFitness();
  }
};

Population.prototype.sortSpecies = function() {
  for (let i = 0; i < this.species.length; i++) {
    this.species[i].sortSpecies();
  }

  var temp = [];
  for (let i = 0; i < this.species.length; i++) {
    var maxi = 0;
    var max_index = 0;
    for (var j = 0; j < this.species.length; j++) {
      if (this.species[j].best_fitness > maxi) {
        maxi = this.species[j].best_fitness;
        max_index = j;
      }
    }
    temp.push(this.species[max_index]);
    this.species.splice(max_index, 1);
    i--;
  }
  arrayCopy(temp, this.species);
};

Population.prototype.cullSpecies = function() {
  for (let i = 0; i < this.species.length; i++) {
    this.species[i].cull();
    this.species[i].fitnessSharing();
    this.species[i].setAverage();
  }
};

Population.prototype.setBestPlayer = function() {
  var temp_best = this.species[0].players[0];

  if (temp_best) {
    temp_best.generation = this.generation;

    if (temp_best.score > this.best_score) {
      this.generation_players.push(temp_best.cloneForReplay());
      window['console'].log('Old best :', this.best_score);
      window['console'].log('New best :', temp_best.score);
      this.best_score  = temp_best.score;
      this.best_player = temp_best.cloneForReplay();
    }
  }
};

Population.prototype.killNotImprovingSpecies = function() {
  for (let i = 2; i < this.species.length; i++) {
    if (this.species[i].generations_without_improvement >= 15) {
      this.species[i].splice(i, 1);
      i--;
    }
  }
};

Population.prototype.getAverageFitnessSum = function() {
  var average = 0;
  for (let i = 0; i < this.species.length; i++) {
    average += this.species[i].average_fitness;
  }
  return average;
};

Population.prototype.killBadSpecies = function() {
  var average_fitness = this.getAverageFitnessSum();
  for (let i = 1; i < this.species.length; i++) {
    if (this.species[i].average_fitness / average_fitness * this.species.length < 1) { // Won't have any children.
      this.species.splice(i, 1);
      i--;
    }
  }
};

Population.prototype.naturalSelection = function() {
  this.speciate();
  this.calculateFitness();
  this.sortSpecies();

  this.cullSpecies();
  this.setBestPlayer();
  this.killNotImprovingSpecies();
  this.killBadSpecies();

  window['console'].log('*** End of generation ' + this.generation.toString() + ' ***');
  window['console'].log('*** Proceeding to natural selection ***');

  var average_sum = this.getAverageFitnessSum();
  var children    = [];
  /* window['console'].log('Species :');*/
  for (let i = 0; i < this.species.length; i++) {
    /* window['console'].log('- Species ' + i.toString());
     window['console'].log('.Best unadjusted fitness : ', this.species[i].best_fitness.toString());
     for (var j in this.species[i].players) {
        window['console'].log(' .Player ' + j.toString());
        window['console'].log('  .Fitness : ' + this.species[i].players[j].fitness.toString());
        window['console'].log('  .Score   : ' + this.species[i].players[j].score.toString());
      }
      */

    children.push(this.species[i].best_ever.clone());

    var number_of_children = Math.floor(this.species[i].average_fitness / average_sum * this.population.length);
    for (var j = 0; j < number_of_children; j++) {
      children.push(this.species[i].copulate(this.innovation_history));
    }
  }

  while (children.length < this.population.length) {
    children.push(this.species[0].copulate(this.innovation_history));
  }
  this.population = [];
  arrayCopy(children, this.population);
  while(this.population.length > this.size) {
    this.population.splice(this.population.length - 1, 1);
  }
  this.generation++;
  for (let i = 0; i < this.population.length; i++) {
    this.population[i].brain.createNetwork();
  }
  this.population_lifetime = 0;
  window['console'].log('*** Starting generation ' + this.generation.toString() + ' ***');
};

Population.prototype.simulate = function() {
  window['console'].log('*** Simulating generation', this.generation, '! ***');

  for (let i = 0; i < this.population.length - 1; i += 2) {
    window['console'].log(i + 1, 'VS', i + 2);
    this.population[i].simulate(this.population[i + 1]);
  }
  window['console'].log('*** Simulation done ***');
};











//
