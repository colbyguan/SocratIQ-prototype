/** Student Schema
{
  user_id: email
  year: 

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
    return Students.find({user_id: this.userId});
  });
}

Meteor.methods({
  'students.new'({user_id, year, field, zip}) {
    requireLogin(Meteor.userId());
    check(user_id, String);
    check(year, String);
    check(field, String);
    check(zip, Match.Integer);

    if (!Students.findOne({user_id: Meteor.userId()})) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {role: 'student'}});
      
      return Students.insert({
        user_id: Meteor.userId(), year, field, zip
      });
    } else {
      throw new Meteor.Error('Already signed up as student');
    }
  }
});
