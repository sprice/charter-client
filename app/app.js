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

var SectionsList = Backbone.View.extend({
  el: '.page',
  render: function () {
    var self = this;
    var sections = new Sections();
    sections.fetch({
      success: function (sections) {
        var template = _.template($('#sections-list-template').html(), {sections: sections.models});
        self.$el.html(template);
      }
    })
  }
});

var SectionList = Backbone.View.extend({
  el: '.page',
  render: function (options) {
    var self = this;
    if (options.id) {
      var freedoms = new Freedoms();
      freedoms.fetch({
        success: function (freedoms) {
          var models = [];
          _.each(freedoms.models, function (freedom) {
            if (freedom.attributes.section == options.id) {
              models.push(freedom);
            }
          });
          var template = _.template($('#section-list-template').html(), {freedoms: models});
          self.$el.html(template);
        }
      })
    }
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
    '': 'sections',
    'section/:id': 'section',
    ':id': 'viewFreedom'
  }
});

var sectionsList = new SectionsList();
var sectionList = new SectionList();
var freedom = new Freedom();

var router = new Router();

router.on('route:sections', function() {
  sectionsList.render();
});
router.on('route:section', function (id) {
  sectionList.render({id: id});
});
router.on('route:viewFreedom', function (id) {
  freedom.render({id: id});
});

Backbone.history.start();
