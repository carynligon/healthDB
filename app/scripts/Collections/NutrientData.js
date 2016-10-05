import Backbone from 'backbone';
import NutrientModel from '../Models/NutrientModel';

export default Backbone.Collection.extend({
  url: '',
  Model: NutrientModel,
  newData: function(calories, fat, itemID) {
    this.create({
      calories,
      fat,
      itemID
    }, {
      success: (data) => {console.log(data);}
    })
  }
});
