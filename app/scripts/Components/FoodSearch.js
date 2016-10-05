import React from 'react';
import $ from 'jquery';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {};
  },
  selectItem(e) {
    let item = (_.where(this.state.results, {_id: e.target.id}))[0];
    console.log(item);
    store.nutrients.newData(item.fields.nf_calories, item.fields.nf_total_fat, item._id);
  },
  performSearch(e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: `https://api.nutritionix.com/v1_1/search/${this.refs.searchTerm.value}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=a3634319&appKey=073de6bb49d2a01e666187a18f553021`,
      success: (data) => {
        this.setState({results: data.hits});
      }
    });
  },
  render() {
    let results;
    if (this.state.results) {
      results = this.state.results.map((result, i) => {
        return (
          <li key={i} onClick={this.selectItem} id={result._id}>
            {result.fields.item_name}
          </li>
        )
      });
    }
    return (
      <div>
        <form className="food-search-form" onSubmit={this.performSearch}>
          <label htmlFor="food-searchbar">Search</label>
          <input type="text" id="food-searchbar" ref="searchTerm" placeholder="Search..."/>
          <input type="submit" id="food-search-btn" value="go"/>
        </form>
        <ul id="search-results-list">
          {results}
        </ul>
      </div>
    )
  }
});
