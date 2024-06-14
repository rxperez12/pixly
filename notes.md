## FRONT END

- Display images - DONE
- If click on image, open new editing page for that image - DONE
  - Has sliders, buttons, and a save function - DONE
- Delete image - stretch goal - DONE
- Reset edits - stretch goal - DONE

## BACK END

-ROUTES:

- GET - /images gets all pictures from S3 - DONE
- POST - /images allows you to save a picture -DONE
- GET /images/:id - get pic by id
- PUT /images/:id - stretch goal - edit existing or undo edits - DONE
- DELETE /images/:id- stretch goal - DONE

## Third Day Goals

- Prevent form redirect, make it into AJAX - DONE
- Change bucket permissions - DONE
  - make sure Jacob has access to delete, add functionality - maybe not today
- Feedback when saving images - redirect to home page? message? - DONE
- Validation for files
- Delete image -send key to api and delete from there - DONE
  - Figure out how to get it to work in AWS
- MORE FILTERSSSSS!!!!!!!!! - DONE
- Look into canvas in general to see more modification
- Other edits like cropping
- Add a tag around image instead of having an on click handler - DONE

TOMORROW LIST

- Prepare for lightning talk - topics to talk about?

  - Tech demo
    - Explain tech stack reasoning
    - show uploading images
    - show backend API
  - Canvas
    - load images onto canvas
    - demo the filter sliders
    - explain canvas context
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
