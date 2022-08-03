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
//console.log(filepath);
//callback(null, { id, text });

// fs.readdir(__dirname, (err, files) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log("\nCurrent directory filenames:");
//     files.forEach(file => {
//       console.log(file);
//     })
//   }
// })


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
// fs.readFile(exports.dataDir + '/' + file, (err, fileData) => {
//   if (err) {
//     callback(err);
//   } else {

//   }
// });




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
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  // console.log(exports.readOne);
  // var testing = exports.readOne(id, (err, data) => { console.log(data); });
  // console.log(testing);
  // if (testing) {

  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, fileData) => {
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

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
