import { Matches } from '../../../api/matches.js';
import { Materialize } from 'meteor/materialize:materialize';
import './student_row.html';

Template.student_row.onRendered(function() {
  $('.tooltipped').tooltip({delay: 50});
});

const extrakeyToLabel = {
  'gender': 'Preference of mentor gender: ',
  'ethnicity': 'Student ethnicity: ',
  'sameEthnicity': 'Would prefer for mentor to be the same ethnicity: ',
  'areas': 'Would like support with: ',
};

Template.student_row.helpers({
  extraInfo() {
    console.log(this.student.extras);
    ret = [];
    if (this.student.extras) {
      const self = this;
      Object.keys(this.student.extras).forEach(function(key) {
        s = extrakeyToLabel[key] + '<strong>';
        if (key !== 'areas') {
          s += self.student.extras[key];
        } else {
          const areas = [];
          self.student.extras.areas.forEach(function(area) {
            area = area.replace(/-/g, ' ');
            areas.push(area.charAt(0).toUpperCase() + area.slice(1))
          });
          s += areas.join(', ');
        }
        s += '</strong>';
        ret.push(s);
      });
    }
    return ret;
  }
});

Template.student_row.events({
  'click #unmatch-student'() {
    Meteor.call('match.removeByStudent', this.student.user_id, function(err) {
      if (err) {
        Materialize.toast(err.error, 3000);
      } else {
        Materialize.toast('Unmatched with student', 3000);
      }
      $('.material-tooltip').hide();
      $('.tooltipped').tooltip({delay: 50});
    });
  },
  'click #accept-student'() {
    Meteor.call('match.accept', this.student.user_id, function(err) {
      if (err) {
        Materialize.toast(err.error, 3000);
      } else {
        Materialize.toast('Accepted student', 3000);
      }
      $('.material-tooltip').hide();
      $('.tooltipped').tooltip({delay: 50});
    });
  },
  'click #reject-student'() {
    Meteor.call('match.removeByStudent', this.student.user_id, function(err) {
      if (err) {
        Materialize.toast(err.error, 3000);
      } else {
        Materialize.toast('Rejected student', 3000);
      }
      $('.material-tooltip').hide();
      $('.tooltipped').tooltip({delay: 50});
    });
  }
});
