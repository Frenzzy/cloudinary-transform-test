## Cloudinary crop with transform image test

### Getting Started

```shell
$ git clone https://github.com/Frenzzy/cloudinary-transform-test.git
$ cd cloudinary-transform-test
$ npm install
```

### How to Run

```shell
$ CLOUDINARY_NAME=name CLOUDINARY_KEY=key CLOUDINARY_SECRET=secret npm start
```

### Actual Result

Cloudinary response Sometimes does not contain the width and height of the image. If not reproduced please try again.

![screen](https://cloud.githubusercontent.com/assets/640669/11591329/03f0558c-9aa8-11e5-9565-b36b41061211.png)

### Expected Result

Cloudinary should always return the actual size for each eager image transformation.
