import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Students } from '../../../api/students.js';
import { Mentors } from '../../../api/mentors.js';
import { Parents } from '../../../api/parents.js';

import './dashboard.html';
import './dashboard.css';
import '../forms/student_form.js';
import '../forms/mentor_form.js';

Template.dashboard.onCreated(function() {
  this.showWelcome = new ReactiveVar(false);
  this.showStudentForm = new ReactiveVar(false);
  this.showMentorForm = new ReactiveVar(false);
  this.showParentForm = new ReactiveVar(false);
  this.nullCount = 0;
  const self = this;
  const user_id = Meteor.userId();
  
  Meteor.subscribe('students', function() {
    if (!Students.findOne({user_id})) {
      incrNullCount(self);
    }
  });
  Meteor.subscribe('mentors', function() {
    if (!Mentors.findOne({user_id})) {
      incrNullCount(self);
    }
  });
  Meteor.subscribe('parents', function() {
    if (!Parents.findOne({user_id})) {
      incrNullCount(self);
    }
  });
});

function incrNullCount(instance) {
  instance.nullCount += 1;
  if (instance.nullCount === 3) {
    instance.showWelcome.set(true);
  }
}

Template.dashboard.helpers({
  showWelcome() {
    return Template.instance().showWelcome.get();
  },
  showStudentForm() {
    return Template.instance().showStudentForm.get();
  },
  showMentorForm() {
    return Template.instance().showMentorForm.get();
  },
});

Template.dashboard.events({
  'click #show-student'(event, instance) {
    instance.showWelcome.set(false);
    instance.showStudentForm.set(true);
  },
  'click #show-mentor'(event, instance) {
    instance.showWelcome.set(false);
    instance.showMentorForm.set(true);
  },
});

