var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Novo App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ],
  on: {
    init: function () {
      console.log('App initialized');
    },
    pageInit: function () {
      console.log('Page initialized');
    },
  }
});

var mainView = app.views.create('.view-main');