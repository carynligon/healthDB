import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: 'https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=a3634319&appKey=073de6bb49d2a01e666187a18f553021',
  performSearch(searchTerm) {
    this.fetch({
      
    })
  }
});
