Users.remove({})
Groups.remove({})
Issues.remove({})
Activities.remove({})
Documents.remove({})

let groups = _.times(20, n => ({
  _id: Random.id(),
  name: faker.company.companyName(),
}))

let issues = []

let users = _.times(256, n => ({
  _id: Random.id(),
  name: faker.name.findName(),
  groupId: _.sample(groups)._id,
}))

let activities = []

console.time('buildIssues')

const buildIssues = _.times(2000, n => {

  const issueId = Random.id()

  const members = _.sampleSize(users, _.random(1, 30))
  const _creator = _.sample(members)

  let _activities = []

  _.each(members, member => {
    _activities.push(_.times(_.random(1, 5), n => {
      const activity = {
        creatorId: member._id,
        text: faker.lorem.sentences(),
      }
      return activity
    }))
  })

  _activities = _.flatten(_activities)

  activities.push(_activities)

  const issue = {
    _id: issueId,
    title: faker.lorem.sentences(),
    creatorId: _creator._id,
  }

  issues.push(issue)

})

users = _.flatten(users)
activities = _.flatten(activities)

console.timeEnd('buildIssues')

console.time('batch insert')
Groups.batchInsert(groups)
Users.batchInsert(users)
Issues.batchInsert(issues)
console.timeEnd('batch insert')

console.time('fetch')
const a = Issues.createQuery({
  title: 1,
  creator: {
    name: 1,
    group: {
      name: 1,
      users: {
        name: 1,
        issues: {
          title: 1,
        },
      },
    },
  },
}).fetch()
console.timeEnd('fetch')
