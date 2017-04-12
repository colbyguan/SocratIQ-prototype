import { Router } from 'meteor/iron:router';
import './components/landing/landing.js';
import './components/about/about.js';
import './components/blog/blog.js';
import './components/dashboard/dashboard.js';
import './components/services/services.js';
import './components/signup/signup.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.render('landing');
});

Router.route('/about', function() {
  this.render('about');
});

Router.route('/blog', function() {
  this.render('blog');
});

Router.route('/services', function() {
  this.render('services');
});

Router.route('/signup', function() {
  this.render('signup');
});

Router.route('/dashboard', function() {
  this.render('dashboard');
});
