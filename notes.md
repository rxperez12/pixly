## FRONT END

- Display images - DONE
- If click on image, open new editing page for that image
  - Has sliders, buttons, and a save function
- Delete image
- Undo edits - stretch goal

## BACK END

-ROUTES:

- GET - / gets all pictures from S3 - DONE
- POST - / allows you to save a picture -DONE
- GET /:id - get pic by id
- PATCH / - stretch goal - edit existing or undo edits
- DELETE - stretch goal

TODO:

- Prevent form redirect, make it into AJAX
- DONE: Change bucket permissions
  - make sure Jacob has access to delete, add functionality - maybe not today
- Feedback when saving images - redirect to home page? message?
- Validation for files
- Delete image -send key to api and delete from there - new Picture function?
  - Figure out how to get it to work in AWS
- MORE FILTERSSSSS!!!!!!!!!
- Look into canvas in general to see more modification
- Other edits like cropping
- Add a tag around image instead of having an on click handler

TOMORROW LIST

- Prepare for lightning talk - topics to talk about?
  - Tech demo
    - Explain tech stack reasoning
    - show uploading images
    - show backend API
  - Canvas
    - demo the filter sliders
    - explain canvas context
    - load images onto canvas
    - apply filters using context and filterString





- BUCKET POLICY:
{
"Version":"2024-06-13",
"Statement": [
{
"Sid": "PublicRead",
"Effect": "Allow",
"Principal": "_",
"Action": ["s3:GetObject", "s3:GetObjectVersion"],
"Resource": ["arm:aws:s3:::NAMEHERE/_"]
}
]
}
