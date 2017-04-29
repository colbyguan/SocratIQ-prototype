import { Router } from 'meteor/iron:router';
import './layout.html';
import './layout.css';

Template.layout.onRendered(function() {
  $(".button-collapse").sideNav();
});

Template.layout.helpers({
  username() {
    return Meteor.user().username;
  }
});

Template.layout.events({
  'click #logout'(event) {
    event.preventDefault();
    Router.go('/');
    AccountsTemplates.logout();
  }
});
