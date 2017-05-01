/** Match schema
{
  student_id:
  mentor_id: 
  status: 'requested' | 'matched'
}
*/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireLogin } from './utils.js';
import { check, Match } from 'meteor/check';

export const Matches = new Mongo.Collection('matches');

if (Meteor.isServer) {
  Meteor.publish('matches', function() {
    if (!this.userId) {
      return null;
    }
    return Matches.find({});
  });
}

Meteor.methods({
  'match.new'(mentor_id) {
    requireLogin(Meteor.userId());
    check(mentor_id, String);

    if (!Matches.findOne({student_id: Meteor.userId(), mentor_id})) {
      return Matches.insert({
        student_id: Meteor.userId(),
        mentor_id,
        status: 'requested'
      });
    } else {
      throw new Meteor.Error('Already requested');
    }
  },
  'match.accept'(student_id) {
    requireLogin(Meteor.userId());
    check(student_id, String);

    return Matches.update({
      student_id,
      mentor_id: Meteor.userId()
    }, {$set: {
      status: 'matched'
    }});
  },
  'match.remove'(mentor_id) {
    requireLogin(Meteor.userId());
    check(mentor_id, String);

    return Matches.remove({
      student_id: Meteor.userId(),
      mentor_id,
    });
  },
  'match.removeByStudent'(student_id) {
    requireLogin(Meteor.userId());
    check(student_id, String);

    return Matches.remove({
      student_id: student_id,
      mentor_id: Meteor.userId()
    });
  },
});
