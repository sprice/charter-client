$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  options.url = 'http://localhost:3000' + options.url;
});

var Sections = Backbone.Collection.extend({
  url: '/sections'
});

var Freedoms = Backbone.Collection.extend({
  url: '/rights'
});

// Update var name. Should be Freedom
var FreedomModel = Backbone.Model.extend({
  urlRoot: '/rights'
});

var SectionList = Backbone.View.extend({
  el: '.page',
  render: function () {
    var self = this;
    var sections = new Sections();
    sections.fetch({
      success: function (sections) {
        var template = _.template($('#section-list-template').html(), {sections: sections.models});
        self.$el.html(template);
      }
    })
  }
});

var FreedomList = Backbone.View.extend({
  el: '.page',
  render: function () {
    var self = this;
    var freedoms = new Freedoms();
    freedoms.fetch({
      success: function (freedoms) {
        var template = _.template($('#freedom-list-template').html(), {freedoms: freedoms.models});
        self.$el.html(template);
      }
    })
  }
});

// update var name. Model should be Freedom
var Freedom = Backbone.View.extend({
  el: '.page',
  render: function (options) {
    var self = this;
    if (options.id) {
      var freedom = new FreedomModel({id: options.id});
      freedom.fetch({
        success: function (freedom) {
          var template = _.template($('#freedom-template').html(), {freedom: freedom});
          self.$el.html(template);
        }
      })
    }
  }
})

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'sections': 'sections',
    ':id': 'viewFreedom'
  }
});

var sectionList = new SectionList();
var freedomList = new FreedomList();
var freedom = new Freedom();

var router = new Router();
router.on('route:home', function () {
  freedomList.render();
});
router.on('route:sections', function() {
  sectionList.render();
});
router.on('route:viewFreedom', function (id) {
  freedom.render({id: id});
});

Backbone.history.start();
