import { Matches } from '../../../api/matches.js';
import { Materialize } from 'meteor/materialize:materialize';
import './mentor_row.html';

Template.mentor_row.onRendered(function() {
  $('.tooltipped').tooltip({delay: 50});
});

const extrakeyToLabel = {
  'gender': 'Mentor gender: ',
  'ethnicity': 'Mentor ethnicity: ',
  'generation': 'Generation as college student: '
};

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
  },
  extraInfo() {
    ret = [];
    if (this.mentor.extras) {
      const self = this;
      Object.keys(this.mentor.extras).forEach(function(key) {
        var value = self.mentor.extras[key];
        value = value.replace(/-/g, ' ');
        value = value.charAt(0).toUpperCase() + value.slice(1)
        s = extrakeyToLabel[key] + '<strong>' + value + '</strong>';
        ret.push(s);
      });
    }
    return ret;
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
      $('.material-tooltip').hide();
      $('.tooltipped').tooltip({delay: 50});
    });
  },
  'click #remove-mentor'() {
    Meteor.call('match.remove', this.mentor.user_id, function(err) {
      if (err) {
        Materialize.toast(err.error, 3000);
      } else {
        Materialize.toast('Removed request', 3000);
      }
      $('.material-tooltip').hide();
      $('.tooltipped').tooltip({delay: 50});
    });
  }
});

