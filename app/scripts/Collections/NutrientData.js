import Backbone from 'backbone';
import NutrientModel from '../Models/NutrientModel';

export default Backbone.Collection.extend({
  url: '',
  Model: NutrientModel
});
