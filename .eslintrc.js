module.exports = {
  "extends": [
    "airbnb-base"
  ],
  "env": {
    "shelljs": true,
    "jest": true,
    "node": true
  },
  "parserOptions": {
       "sourceType": "script"
    },
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "error",
    "one-var": "error",
    "consistent-return": "error",
    "no-param-reassign": "error",
    "global-require": "error",
    "import/no-dynamic-require": 1,
    "comma-dangle": ["error", "never"]
  }
}  