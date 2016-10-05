import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '',
  idAttribute: '_id',
  defaults: {
    timestamp: new Date()
  }
});
