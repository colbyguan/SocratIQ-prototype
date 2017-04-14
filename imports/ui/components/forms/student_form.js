import { Students } from '../../../api/students.js';
import { Materialize } from 'meteor/materialize:materialize';
import './student_form.html';

Template.student_form.onRendered(function() {
  $('select').material_select();
});

Template.student_form.events({
  'click #submit-student'(event, instance) {
    const $year = $('#student-year');
    const $interest = $('#student-interest');
    const $zip = $('#student-zip');
    var flag = false;

    if (!$year.val()) {
      Materialize.toast('Year is required!', 3000);
      flag = true;
    }
    if ($interest.val().length === 0) {
      Materialize.toast('Field of interest is required!', 3000);
      flag = true;
    }
    if ($zip.val().length < 5) {
      Materialize.toast('ZIP code is too short!', 3000);
      flag = true;
    }
    if (!flag) {
      Meteor.call('students.new', {
        year: $year.val(),
        field: $interest.val(),
        zip: parseInt($zip.val())
      }, function(err) {
        if (err) {
          Materialize.toast(err.error, 3000);
        } else {
          Materialize.toast('Added as student', 3000);
        }
      });
    }
  }
});
