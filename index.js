var cloudinary = require('cloudinary');
var id = 'size-test';
var image = require('path').join(__dirname, 'image.jpg');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

console.log(
  'Uploading to Cloudinary...',
  '\n  id: ', id,
  '\n  image: ', image
);

cloudinary.uploader.upload(image, null, {
  public_id: id,
  resource_type: 'image',
  type: 'upload',
  invalidate: true,
  overwrite: true,
  folder: 'test',
  angle: 'exif',
  eager: {
    crop: 'lfill',
    width: 1140,
    height: 496,
    gravity: 'center',
    quality: 90,
    flags: 'progressive',
    format: 'jpg'
  }
})
  .then(testOk)
  .then(testFail)
  .catch(function (err) {
    console.log(err);
  });

function testOk() {
  return cloudinary.uploader.explicit('test/' + id, null, {
    type: 'upload',
    eager: {
      transformation: [
        {
          crop: 'crop',
          x: 0,
          y: 0,
          width: 3264,
          height: 2445 // <= difference
        },
        {
          crop: 'limit',
          width: 1140,
          height: 496,
          gravity: 'center',
          quality: 90,
          flags: 'progressive',
          format: 'jpg'
        }
      ]
    }
  }).then(function (result) {
    console.log('\ntestOk ===>\n', result.eager[0]);
  });
}

function testFail() {
  return cloudinary.uploader.explicit('test/' + id, null, {
    type: 'upload',
    eager: {
      transformation: [
        {
          crop: 'crop',
          x: 0,
          y: 0,
          width: 3264,
          height: 2448 // <= difference
        },
        {
          crop: 'limit',
          width: 1140,
          height: 496,
          gravity: 'center',
          quality: 90,
          flags: 'progressive',
          format: 'jpg'
        }
      ]
    }
  }).then(function (result) {
    console.log('\ntestFail ===>\n', result.eager[0]);
  });
}
