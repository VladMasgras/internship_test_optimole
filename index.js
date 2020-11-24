const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const directoryPath = path.join(__dirname, 'images');
var sizeOf = require('image-size');


exports.handler = async function ( event ) {
	let optimized = []

	let data = event.optimoleKey
	let buff = Buffer.from(data, 'base64');  
	let text = buff.toString('utf-8');


	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		files.forEach(function (file) {
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
		});
	});

	return {pass: text, optimized: optimized}

};

