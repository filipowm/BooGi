const jargonData = require('./jargon.json');

const validateProperty = (entry, property, key) => {
  const value = entry[property];
  if (typeof value === 'undefined' || value === null || value.length === 0) {
    throw "Property '" + property + "' is not defined for jargon entry '" + key + "'!";
  }
};

const jargon = {};
for (const key in jargonData) {
  const entry = jargonData[key];
  validateProperty(entry, 'name', key);
  validateProperty(entry, 'description', key);
  let long_description = '<span><b>' + entry.name + '</b>';

  let long_name = entry.long_name;
  if (typeof long_name !== 'undefined' && long_name !== null && long_name.length > 0) {
    long_description += ' - ' + long_name;
  }
  long_description += '</span> ' + entry.description;
  jargon[key] = long_description;
}

module.exports = jargon;
