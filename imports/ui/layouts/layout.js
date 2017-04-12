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
  'click #logout'() {
    AccountsTemplates.logout();
    Router.go('/');
  }
});
