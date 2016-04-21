exports.seed = function(knex, Promise) {
  return knex('todos').del().then(function() {
    return Promise.all([
      // Inserts seed entries
      knex('todos').insert({task: 'learn react'}),
      knex('todos').insert({task: 'eat food'}),
      knex('todos').insert({task: 'drink stuff'})
    ]);
  });
};
