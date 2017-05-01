/** Student Schema
{
  user_id: email
  name:
  year: 
  field:
  zip:
}
*/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireLogin } from './utils.js';
import { check, Match } from 'meteor/check';

export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish('students', function() {
    if (!this.userId) {
      return null;
    }
    return Students.find();
  });
}

Meteor.methods({
  'students.new'({year, field, zip, extras}) {
    requireLogin(Meteor.userId());
    check(year, String);
    check(field, String);
    check(zip, Match.Integer);
    check(extras, Object);

    if (!Students.findOne({user_id: Meteor.userId()})) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {role: 'student'}});
      
      return Students.insert({
        user_id: Meteor.userId(), name: Meteor.user().username, year, field, zip, extras
      });
    } else {
      throw new Meteor.Error('Already signed up as student');
    }
  }
});
