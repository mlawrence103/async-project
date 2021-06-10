const router = require('express').Router();
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

//read image files
const fs = require('fs');

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key 652dade00cda490c9d41430b1ee56bb7');

//test get route
router.get('/', (req, res, next) => {
  res.send('Hello');
});

//get image url from form
router.post('/', async (req, res, next) => {
  console.log('HERE in post route');
  try {
    const imgUrl = Object.keys(req.body)[0];
    const testUrl =
      'https://www.friendsofthewildflowergarden.org/generaljpegs/Seasons/latesummer/hogpeanutleaf300.jpg';
    console.log('imgUrl in route: ', imgUrl);
    // const imgBytes = await fs.readFile(imgUrl, (err, data) => {
    //   if (err) throw err;
    //   console.log('fs read file data: ', data);
    //   return data;
    // });
    // console.log('imgUrl in post route: ', imgBytes);
    // console.log('metadata: ', metadata);
    stub.PostModelOutputs(
      {
        model_id: 'aaa03c23b3724a16a56b629203edc62c', //general image model
        version_id: 'fde10322f3314b1fb08873537d96a219',
        inputs: [{ data: { image: { url: imgUrl } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          throw new Error(err);
        }
        // console.log('HERE in stub method with respose: ', response);
        // console.log('response.outputs[0]: ', response.outputs[0]);
        if (response.status.code !== 10000) {
          throw new Error(
            'Post model outputs failed, status: ' + response.status.description
          );
        }

        // Since we have one input, one output will exist here.
        const output = response.outputs[0];

        console.log('Predicted concepts:');
        for (const concept of output.data.concepts) {
          console.log(concept.name + ' ' + concept.value);
        }
        res.json(output);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
