"use strict";

var path = require('path');

var fs = require('fs');

var sharp = require('sharp');

var directoryPath = path.join(__dirname, 'images');

var sizeOf = require('image-size');

exports.handler = function _callee(event) {
  var optimized, data, buff, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dimensions, dimensions2, percent;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          optimized = [];
          data = event.optimoleKey;
          buff = Buffer.from(data, 'base64');
          text = buff.toString('utf-8');
          filenames = fs.readdirSync(directoryPath);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;

          for (_iterator = filenames[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            file = _step.value;

            try {
              sharp(path.join(__dirname, "images", file)).resize({
                height: 500,
                width: 500,
                fit: sharp.fit.inside
              }).toFormat('jpg').toFile(path.join(__dirname, "optimized", file));
            } catch (err) {
              console.log(err);
            }

            dimensions = sizeOf(path.join(__dirname, "images", file));
            dimensions2 = sizeOf(path.join(__dirname, "optimized", file));
            original_size = dimensions.width * dimensions.height;
            resulted_size = dimensions2.width * dimensions2.height;
            percent = resulted_size / original_size * 100;
            optimized.push({
              filePath: "optimized/" + file,
              procent: percent
            });
          }
          /*
          	fs.readdir(directoryPath, function (err, files) {
          		if (err) {
          			return console.log('Unable to scan directory: ' + err);
          		} 
          
          		for (file of files) {
          			try {
          				sharp(path.join(__dirname, "images", file))
          				.resize({height: 500, width: 500})
          				.toFile(path.join(__dirname, "optimized", file))
          			}
          			catch(err) {
          				console.log(err)
          			}
          			var dimensions = sizeOf(path.join(__dirname, "images", file))
          			original_size = dimensions.width * dimensions.height
          			let percent = 500 * 500 / original_size * 100
          			optimized.push({filepath: "optimized/" + file, procent: percent})
          		}
          		console.log(optimized)
          	})
          */


          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 16:
          _context.prev = 16;
          _context.prev = 17;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 19:
          _context.prev = 19;

          if (!_didIteratorError) {
            _context.next = 22;
            break;
          }

          throw _iteratorError;

        case 22:
          return _context.finish(19);

        case 23:
          return _context.finish(16);

        case 24:
          console.log({
            pass: text,
            optimized: optimized
          });
          return _context.abrupt("return", {
            pass: text,
            optimized: optimized
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 12, 16, 24], [17,, 19, 23]]);
};