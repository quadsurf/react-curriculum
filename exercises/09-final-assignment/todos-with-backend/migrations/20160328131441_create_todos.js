exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', (t) => {
    t.increments()
    t.string('task')
    t.boolean('is_completed').default(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos')
};
