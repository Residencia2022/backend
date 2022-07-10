import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import sharp from 'sharp';

const uploadRouter = Router();

uploadRouter.post('/', async (req, res, next) => {
  try {
    // Check if there is a file in the request
    if (!req.files) {
      next(new Error('No file uploaded'));
      return;
    }

    // Expected name of the file in the request: 'file'
    const { file } = req.files;

    // Check if the file is an image or a pdf
    const isImage = file.mimetype.startsWith('image/');
    const isPdf = file.mimetype === 'application/pdf';
    if (!isImage && !isPdf) {
      next(new Error('Invalid file type'));
      return;
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `uploads/${fileName}`;

    // Check if the folder exists
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }

    // Resize the image to a maximum of 500px and save it to the filePath
    if (isImage) {
      await sharp(file.data).resize(500, 500).toFile(filePath);
      res.json({ data: fileName });
    }

    // Save the pdf to the filePath
    if (isPdf) {
      file.mv(filePath, (err) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ data: fileName });
      });
    }
  } catch (err) {
    next(err);
  }
});

export default uploadRouter;
