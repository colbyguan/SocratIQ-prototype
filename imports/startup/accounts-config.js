// import { AccountsTemplates } from 'meteor/useraccounts:materialize';
 
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "First and Last Name",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

AccountsTemplates.configure({
  onSubmitHook: function(err) {
    if (!err) {
      Router.go('/dashboard');
    }
  },
  onLogoutHook: function() {
    Router.go('/');
  }
});
