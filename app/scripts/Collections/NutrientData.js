import Backbone from 'backbone';
import NutrientModel from '../Models/NutrientModel';

import settings from '../settings';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Nutrition`,
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
