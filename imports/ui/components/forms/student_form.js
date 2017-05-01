import { Students } from '../../../api/students.js';
import { Materialize } from 'meteor/materialize:materialize';
import './student_form.html';

Template.student_form.onCreated(function() {
  this.showOptional = new ReactiveVar(false);
});

Template.student_form.onRendered(function() {
  $('select').material_select();
});

Template.student_form.helpers({
  showOptional() {
    return Template.instance().showOptional.get();
  }
});

Template.student_form.events({
  'click #show-optional'(_, instance) {
    instance.showOptional.set(!instance.showOptional.get());
    setTimeout(function() {
      $('select').material_select();
    }, 100);
  },
  'click #submit-student'(event, instance) {
    const $year = $('#student-year');
    const $interest = $('#student-interest');
    const $zip = $('#student-zip');
    const $gender = $('#student-gender');
    const $sameEthnicity = $('#student-same-eth');
    const $ethnicity = $('#student-eth');
    const areas = [];
    var flag = false;

    $('#student-areas input:checked').each(function() {
      areas.push($(this).attr('name'));
    });

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
        zip: parseInt($zip.val()),
        extras: {
          gender: $gender.val(),
          sameEthnicity: $sameEthnicity.val(),
          ethnicity: $ethnicity.val(),
          areas
        }
      }, function(err) {
        if (err) {
          Materialize.toast(err.error, 3000);
        } else {
          Materialize.toast('Added as student', 3000);
          document.location.reload(true);
        }
      });
    }
  }
});
