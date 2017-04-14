/** Parent Schema
{
  user_id: email
  student_id: email
}
*/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { requireLogin } from './utils.js';
import { check } from 'meteor/check';

export const Parents = new Mongo.Collection('parents');

if (Meteor.isServer) {
  Meteor.publish('parents', function() {
    if (!this.userId) {
      return null;
    }
    return Parents.find({user_id: this.userId});
  });
}

Meteor.methods({
  'parents.new'({student_email}) {
    var student_id;
    requireLogin(Meteor.userId());
    check(student_email, String);

    const student = Accounts.findUserByEmail(student_email);
    if (!student || !student.role !== 'student') {
      throw new Meteor.Error('Student email address not found');
    } else {
      student_id = student._id;
    }

    if (!Parents.findOne({user_id: Meteor.userId()})) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {role: 'parent'}});
      
      return Parents.insert({
        user_id: Meteor.userId(), student_id
      });
    } else {
      throw new Meteor.Error('Already signed up as parent');
    }
  }
});
