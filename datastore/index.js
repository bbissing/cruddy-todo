const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, id) {
    if (err) {
      callback(err);
    } else {
      var test = id + '.txt';
      var filepath = path.join(exports.dataDir, test);
      fs.writeFile(filepath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    var answer = [];

    if (err) {
      callback(err);
    } else {
      if (files.length === 0) {
        callback(null, files);
      } else {
        files.forEach(file => {
          var arr = file.split('.');
          answer.push({'id': arr[0], 'text': arr[0]});
        });
        callback(null, answer);
      }
    }
  });
};

exports.readOne = (id, callback) => {
  // console.log(id);
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, fileData) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {'id': id, 'text': fileData.toString() });
    }
  });

};

exports.update = (id, text, callback) => {

  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, fileData) => {
    if (err) {
      callback(err);
    } else {
      var fileName = id + '.txt';
      var filePath = path.join(exports.dataDir, fileName);
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, fileData) => {

    if (err) {
      callback(err);
    } else {

      fs.unlink(exports.dataDir + '/' + id + '.txt', function(err) {
        if (err) {
          callback(err);
        } else {
          callback();
        }
      });
    }
  });
};




// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
