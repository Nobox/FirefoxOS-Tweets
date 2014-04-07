FirefoxOS-Tweets
================

Live feed of Firefox OS tweets.

## Installation

*This tutorial assumes that Node.js is installed*

**Install `NodeJS` dependencies:**
```javascript
npm install
```

**Install `Bower` (globally) if not present:**
```javascript
npm install -g bower
```

**Install `Bower` Components:**
```javascript
bower install
```

---

##Development Environment:
To compile CoffeeScript, SCSS files and server a test environment run the following command:
```javascript
gulp
```

##Production Environment:
To ensure that specific production code is ran use the following command:
```javascript
NODE_ENV=production node app
```

