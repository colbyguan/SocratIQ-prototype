import { Matches } from '../../../api/matches.js';
import { Materialize } from 'meteor/materialize:materialize';
import './mentor_row.html';

Template.mentor_row.onRendered(function() {
  $('.tooltipped').tooltip({delay: 50});
});

Template.mentor_row.helpers({
  servicesList() {
    const s = [];
    this.mentor.services.forEach(function(service) {
      if (service === 'admissions') {
        s.push('Admissions Mentoring');
      } else if (service === 'exam') {
        s.push('SAT / ACT Prep');
      } else if (service === 'essay') {
        s.push('Essay Editing');
      }
    });
    return s;
  },
  status() {
    if (this.requested) {
      return Matches.findOne({
        mentor_id: this.mentor.user_id,
        student_id: Meteor.userId()
      }).status;
    }
  }
});

Template.mentor_row.events({
  'click #request-mentor'() {
    Meteor.call('match.new', this.mentor.user_id, function(err) {
      if (err) {
        Materialize.toast(err.error, 3000);
      } else {
        Materialize.toast('Requested mentor', 3000);
      }
    });
  }
});

