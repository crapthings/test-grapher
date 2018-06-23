_ = require('lodash')
faker = require('faker')

Users = new Mongo.Collection('users')
Groups = new Mongo.Collection('groups')
Issues = new Mongo.Collection('issues')
Activities = new Mongo.Collection('activities')
Documents = new Mongo.Collection('documents')

Issues.addLinks({
  creator: {
    type: 'one',
    collection: Users,
    field: 'creatorId',
  },
})

Users.addLinks({
  group: {
    type: 'one',
    collection: Groups,
    field: 'groupId',
  },
  issues: {
    collection: Issues,
    inversedBy: 'creator',
  },
})

Groups.addLinks({
  users: {
    collection: Users,
    inversedBy: 'group',
  },
})
