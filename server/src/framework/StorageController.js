/*
import StorageService from '../services/StorageService.mjs';
import { forbidden, unauthorized, success, serverError, badRequest, notFound } from '../utils/responses.mjs';
import { webCamImageToBuffer } from '../utils/image.utils.mjs';

class StorageController {
  // Bucket Actions
  // ----------------------------------------------------------------
  //
  listBuckets(req, res, next) {
    StorageService.listBuckets()
      .then((r) => res.json(r))
      .catch(() => serverError(res));
  }

  listBucketFiles(req, res, next) {
    const name = req.params.id;

    StorageService.listBucketFiles(name)
      .then((r) => res.json(r))
      .catch((err) => notFound(res));
  }

  createBucket(req, res, next) {
    if (!req.body.client && !req.body.name) return badRequest(res);

    const name = req.body.client || req.body.name;

    StorageService.createBucket(name)
      .then((r) => success(res))
      .catch(() => serverError(res));
  }

  deleteBucket(req, res, next) {
    const name = req.params.id;

    StorageService.deleteBucket(name)
      .then((r) => success(res))
      .catch((err) => notFound(res));
  }

  // File Actions
  // ----------------------------------------------------------------
  //

  listFilesForClient(req, res, next) {
    const client = req.user.clientId;

    StorageService.listFilesForClient(client)
      .then((r) => res.json(r))
      .catch((err) => notFound(res));
  }

  getFile(req, res, next) {
    const id = req.params.id;
    StorageService.getFile(id)
      .then((r) => res.json(r))
      .catch((err) => notFound(res));
  }

  getFileUrl(req, res, next) {
    const id = req.params.id;
    StorageService.getFile(id)
      .then((r) => res.json({ url: r.location }))
      .catch((err) => notFound(res));
  }

  upload(req, res, next) {
    if (req.files.length < 1) return badRequest(res);
    const user = req.user;
    const files = req.files;

    StorageService.upload(files, user)
      .then((r) => res.json(r))
      .catch((err) => serverError(res));
  }

  uploadPublic(req, res) {
    if (req.files.length < 1) return badRequest(res);
    const user = {
      id: null,
      clientId: req.params.id,
      role: null
    };
    const files = req.files;

    StorageService.upload(files, user)
      .then((r) => res.json(r))
      .catch((err) => serverError(res));
  }

  deleteFile(req, res, next) {
    const id = req.params.id;
    const bucket = req.user.clientId;

    StorageService.deleteFile(id, bucket)
      .then((r) => success(res))
      .catch(() => notFound(res));
  }

  // Image Actions
  // ----------------------------------------------------------------
  //

  listImages(req, res, next) {
    const client = req.user.clientId;

    StorageService.listFilesForClient(client)
      .then((r) => r.filter((record) => record.mimeType && record.mimeType.includes('image')))
      .then((r) => res.json(r))
      .catch((err) => notFound(res));
  }

  getImage(req, res, next) {
    const id = req.params.id;
    StorageService.getFile(id)
      .then((r) => StorageService.downloadImage(r.location))
      .then((buf) => {
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': buf.length
        });
        res.end(buf);
      })
      // .then((r) => console.log(r))
      // .catch((err) => console.log(err));
      .catch((err) => notFound(res));
  }

  uploadImage(req, res, next) {
    if (req.files && req.files.length != 1) return badRequest(res);

    const user = req.user;
    let files = req.files;

    const options = _parseImageOptions(req);

    StorageService.uploadImage(files, user, options)
      .then((r) => res.json({ url: r[0].location }))
      .catch((err) => serverError(res));
  }

  uploadImageFromBuffer(req, res, next) {
    if (!req.body.webcamImage && !req.body.chatAttachment) return badRequest(res);

    const user = req.user;
    let files = {};

    const options = _parseImageOptions(req);

    if (req.body.webcamImage) {
      files = webCamImageToBuffer(req.body.webcamImage);
    }
    if (req.body.chatAttachment) {
      files = _chatAttachmentToBuffer(req.body.chatAttachment);
    }

    StorageService.uploadImage(files, user, options)
      .then((r) => res.json({ url: r[0].location }))
      .catch((err) => serverError(res));
  }
}

// Utility Functions
// ----------------------------------------------------------------
//

function _parseImageOptions(req) {
  return {
    size: {
      width: parseInt(req.query.width) || null,
      height: parseInt(req.query.height) || null
    },
    blur: parseInt(req.query.blur) || null
  };
}

// function _webCamImageToBuffer(base64) {
//   let string = base64.split(';base64,').pop();
//   let buffer = Buffer.from(string, 'base64');
//
//   return [
//     {
//       fieldname: 'upload',
//       originalname: new Date().valueOf() + '-' + 'webcamImage.jpeg',
//       encoding: '7bit',
//       mimetype: 'image/jpeg',
//       size: 0,
//       buffer
//     }
//   ];
// }

function _chatAttachmentToBuffer(attachment) {
  let string = attachment.src.split(';base64,').pop();
  let buffer = Buffer.from(string, 'base64');
  return [
    {
      fieldname: 'upload',
      originalname: 'chatAttachment-' + attachment.name + '.' + attachment.type.split('/')[1],
      encoding: '7bit',
      mimetype: attachment.type,
      size: 0,
      buffer
    }
  ];
}

export const storageController = new StorageController();
*/
