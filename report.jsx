var React = require('react');
var ReactPivot = require('react-pivot');
var createReactClass = require('create-react-class');

var rows = require('./data.json');

var dimensions = [
  { title: 'Date', value: 'date' },
  { title: 'Host', value: 'host' }
];
var reduce = function(row, memo) {
  if (row.type === 'impression') memo.impressions = memo.impressions + 1 || 1;
  else if (row.type === 'display') memo.displays = memo.displays + 1 || 1;
  else if (row.type === 'load') memo.loads = memo.loads + 1 || 1;
  return memo;
};

var calculations = [
  {
    title: 'Impressions',
    value: 'impressions'
  },
  {
    title: 'Loads',
    value: 'loads'
  },
  {
    title: 'Displays',
    value: 'displays'
  },
  {
    title: 'Load Rate',
    value: function(memo) {
      return (memo.loads / memo.impressions * 100).toFixed(1);
    },
    template: function(value) {
      return value + '%';
    }
  },
  {
    title: 'Display Rate',
    value: function(memo) {
      return (memo.displays / memo.loads * 100).toFixed(1);
    },
    template: function(value) {
      return value + '%';
    }
  }
];

module.exports = createReactClass({
  render() {
    return (
      <ReactPivot
        rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
      />
    );
  }
});
