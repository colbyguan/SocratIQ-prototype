/** Match schema
{
  student_id:
  mentor_id: 
  status: 
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
  }
});
