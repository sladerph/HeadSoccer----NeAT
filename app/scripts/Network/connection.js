var mutation_amount = 0.25;

export function Connection(input, output, innovation) {
  this.input      = input;
  this.output     = output;
  this.enabled    = true;
  this.innovation = innovation;
  this.weight     = Math.random() * 2 - 1;

  this.mutateWeight = function() {
    this.weight += Math.random() * (mutation_amount * 2) - mutation_amount;
  };

  this.mutateEnabled = function() {
    this.enabled = !this.enabled;
  };

  this.clone = function(input, output) {
    var clone     = new Connection(input, output, this.innovation);
    clone.enabled = this.enabled;
    clone.weight  = this.weight;
    return clone;
  };
}

export function ConnectionHistory(input, output, innovation, all_innovations) {
  this.input = input;
  this.output = output;
  this.innovation = innovation;
  this.all_innovations = [];
  arrayCopy(all_innovations, this.all_innovations);

  this.doMatch = function(network, input, output) {
    if (network.connections.length == this.all_innovations.length) {
      if (input.id == this.input && output.id == this.output) {
        for (var i = 0; i < network.connections.length; i++) {
          if (!this.all_innovations.includes(network.connections[i].innovation)) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  };
}

export function arrayCopy(in_, out) {
  for (let i = 0; i < in_.length; i++) {
    out.push(in_[i]);
  }
}
