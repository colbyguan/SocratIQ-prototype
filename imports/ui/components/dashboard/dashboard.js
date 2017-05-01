import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Students } from '../../../api/students.js';
import { Mentors } from '../../../api/mentors.js';
import { Matches } from '../../../api/matches.js';
import { Parents } from '../../../api/parents.js';

import './dashboard.html';
import './dashboard.css';
import '../forms/student_form.js';
import '../forms/mentor_form.js';
import './mentor_row.js';
import './student_row.js';

Template.dashboard.onCreated(function() {
  this.showWelcome = new ReactiveVar(false);
  this.showStudentForm = new ReactiveVar(false);
  this.showMentorForm = new ReactiveVar(false);
  this.showParentForm = new ReactiveVar(false);
  this.studentMode = new ReactiveVar(false);
  this.nullCount = 0;
  const self = this;
  const user_id = Meteor.userId();
  
  Meteor.subscribe('students', function() {
    if (!Students.findOne({user_id})) {
      incrNullCount(self);
    } else {
      self.studentMode.set(true);
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
  Meteor.subscribe('matches');
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
  studentMode() {
    return Template.instance().studentMode.get();
  },
  openMentors() {
    return Mentors.find().fetch().filter(function(mentor) {
      return !Matches.findOne({
        student_id: Meteor.userId(),
        mentor_id: mentor.user_id
      });
    });
  },
  requestedMentors() {
    return Mentors.find().fetch().filter(function(mentor) {
      return !!Matches.findOne({
        student_id: Meteor.userId(),
        mentor_id: mentor.user_id
      });
    });
  },
  requestedStudents() {
    return Matches.find({mentor_id: Meteor.userId()}).fetch().filter(function(match) {
      return match.status === 'requested';
    }).map(function(match) {
      return Students.findOne({user_id: match.student_id});
    });
  },
  matchedStudents() {
    return Matches.find({mentor_id: Meteor.userId()}).fetch().filter(function(match) {
      return match.status === 'matched';
    }).map(function(match) {
      return Students.findOne({user_id: match.student_id});
    });
  }
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

