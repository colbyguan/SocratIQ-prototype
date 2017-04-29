import { Mentors } from '../../../api/mentors.js';
import { Materialize } from 'meteor/materialize:materialize';
import './mentor_form.html';

Template.mentor_form.onRendered(function() {
  $('select').material_select();
});

Template.mentor_form.events({
  'click #submit-mentor'(event, instance) {
    const $year = $('#mentor-year');
    const $interest = $('#mentor-interest');
    const $zip = $('#mentor-zip');
    const $inst = $('#mentor-inst');
    const services = [];
    $('#mentor-services input:checked').each(function() {
      services.push($(this).attr('name'));
    });
    var flag = false;

    if (!$year.val()) {
      Materialize.toast('Year is required!', 3000);
      flag = true;
    }
    if ($interest.val().length === 0) {
      Materialize.toast('Major is required!', 3000);
      flag = true;
    }
    if ($zip.val().length < 5) {
      Materialize.toast('ZIP code is too short!', 3000);
      flag = true;
    }
    if ($inst.val().length === 0) {
      Materialize.toast('Institution is required!', 3000);
      flag = true;
    }
    if (!flag) {
      Meteor.call('mentors.new', {
        year: $year.val(),
        major: $interest.val(),
        zip: parseInt($zip.val()),
        institution: $inst.val(),
        services
      }, function(err) {
        if (err) {
          Materialize.toast(err.error, 3000);
        } else {
          Materialize.toast('Added as mentor', 3000);
        }
      });
    }
  }
});
