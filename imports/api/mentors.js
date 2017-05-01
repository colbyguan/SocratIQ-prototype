  /** Mentor Schema
{
  user_id: email
  name: 
  year: 
  major:
  zip:
  institution: 
  services: 
}
*/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireLogin } from './utils.js';
import { check, Match } from 'meteor/check';

export const Mentors = new Mongo.Collection('mentors');

if (Meteor.isServer) {
  Meteor.publish('mentors', function() {
    if (!this.userId) {
      return null;
    }
    return Mentors.find({});
  });
}

Meteor.methods({
  'mentors.new'({year, major, zip, institution, services, extras}) {
    requireLogin(Meteor.userId());
    check(year, String);
    check(major, String);
    check(zip, Match.Integer);
    check(institution, String);
    check(services, Array);
    check(extras, Object);

    if (!Mentors.findOne({user_id: Meteor.userId()})) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {role: 'mentor'}});

      return Mentors.insert({
        user_id: Meteor.userId(), name: Meteor.user().username, year, major, zip, institution, services, extras
      });
    } else {
      throw new Meteor.Error('Already signed up as mentor');
    }
  }
});