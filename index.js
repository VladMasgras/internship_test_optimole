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

	filenames = fs.readdirSync(directoryPath)
	
	for (file of filenames){
		try {
			sharp(path.join(__dirname, "images", file))
			.resize({height: 500, width: 500, fit: sharp.fit.inside})
			.toFormat('jpg')
			.toFile(path.join(__dirname, "optimized", file))
		}
		catch(err) {
			console.log(err)
		}
		var dimensions = sizeOf(path.join(__dirname, "images", file))
		var dimensions2 = sizeOf(path.join(__dirname, "optimized", file))
		original_size = dimensions.width * dimensions.height
		resulted_size = dimensions2.width * dimensions2.height
		let percent = (resulted_size / original_size * 100)
		optimized.push({filePath: "optimized/" + file, procent: percent})
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
	console.log({pass: text, optimized: optimized})
	return {pass: text, optimized: optimized}

};

