var fs = require('fs');
var _ = require('lodash');

var usernames = [
  'max',
  'nathan',
  'henna',
  'aaron',
  'ian',
  'zach',
  'hillary',
  'bill',
  'melinda',
  'john',
  'tom',
  'richard',
  'harry',
  'rainforestluv',
  'aRealFarmer',
  'catLady'
];

var amounts = [1, 2, 3, 4, 5, 10, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75, 80, 95, 100, 120, 125, 130, 140, 150, 175,
  200, 225, 250, 275, 300, 350, 400, 450, 500, 750, 1000
];

var charities = [
  "Red Cross",
  "ASPCA",
  "Humane Society",
  "UNICEF",
  "Habitat for Humanity",
  "Susan G. Komen Foundation to Fight Breast Cancer",
  "Amnesty International",
  "EFF",
  "Rainforest Action Network",
  "San Francisco Children's Hospitol",
  "San Francisco Homeless Shelter"
];

var portfolios = {
  "Farm Focus": "Preventing Cruelty to Animals",
  "Pet Friendly": "Preventing Cruelty to Animals",
  "Curing Preventable Diseases": "World Health",
  "Cancer Research": "World Health",
  "Rare Disease Research": "World Health",
  "End Slavery Now": "Children",
  "Child Abuse Action": "Children",
  "Ready Set Rainforest": "Conservation",
  "Greenhouse Gas Emissions": "Conservation",
  "Open Internet": "Technology",
  "Theater": "The Arts",
  "Fine Arts": "The Arts",
  "San Francisco": "Local",
  "New York": "Local"
};

var charityMap = {};

var charityjson = _.map(charities, function(c) {
  var charityObject = {
    type: "charity",
    name: c,
    followers: [],
    amount: _.shuffle(amounts)[0] * 5,
    typicalSplit: _.random(20) * 5
  };
  charityMap[c] = charityObject;
  return charityObject;
});

function makeSplit(num) {
  var multiple = 5;
  var remaining = 100 / multiple;
  var max = Math.min(Math.round(remaining / num) * 2, remaining);
  return _(_.range(num).reverse()).map(function(left) {
    if (left === 0) {
      return remaining * multiple;
    }
    var splitChosen = _.random(Math.round(max / (left + 1)), max);
    remaining -= splitChosen;
    max = Math.min(max, remaining);
    return splitChosen * multiple;
  }).sortBy().reverse().value();
}

function makeSplitAmounts(total, split) {

  if (_.isEmpty(split)) {
    return [];
  }

  total = parseFloat(total.toFixed(2));
  var splitAmounts = _.map(split, function(v) {
    return parseFloat((v / 100 * total).toFixed(2));
  });

  var sum = parseFloat(_.reduce(splitAmounts, function(t, v) {
    return t + v
  }).toFixed(2));

  if (sum === total) {
    return splitAmounts;
  } else {
    var diff = sum - total;
    if (diff > 0) {
      splitAmounts[0] += diff;
    } else {
      var diffIdx = _.findIndex(_.clone(splitAmounts).reverse());
      splitAmounts[diffIdx] += diff;
    }
    return splitAmounts;
  }
}

var userjson = _.map(usernames, function(username) {
  var charityList = _(charities).shuffle().take(_.random(5)).value();
  var followers = _(usernames).shuffle().take(_.random(10)).value();
  var amount = _.shuffle(amounts)[0];
  var split = makeSplit(charityList.length);
  var splitAmounts = makeSplitAmounts(amount, split);

  return {
    type: "user",
    name: username,
    amount: amount,
    charities: _.map(charityList, function(c, i) {
      charityMap[c].followers.push(username);
      return {
        name: c,
        percent: split[i],
        splitAmounts: splitAmounts[i]
      };
    }),
    followers: followers
  };
});

var portfoliojson = _.map(portfolios, function(category, name) {
  var charityList = _(charities).shuffle().take(_.random(3, 5)).value();
  var followers = _(usernames).shuffle().take(_.random(usernames.length)).value();

  return {
    type: "portfolio",
    name: name,
    category: category,
    charities: charityList,
    followers: followers,
    amount: _.shuffle(amounts)[0] * 5,
    typicalSplit: _.random(20) * 5
  };
});

fs.writeFileSync('./src/assets/users.json', JSON.stringify(userjson, undefined, 2));
fs.writeFileSync('./src/assets/portfolios.json', JSON.stringify(portfoliojson, undefined, 2));
fs.writeFileSync('./src/assets/charities.json', JSON.stringify(charityjson, undefined, 2));
