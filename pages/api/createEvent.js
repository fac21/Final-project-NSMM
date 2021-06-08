
import { createEvent } from "../../database/model";

export default (req, res) => {


    const user_id = req.params
    const interests_id = req.body.interests_id;
      console.log(interests_id);
    console.log(user_id);
    console.log(req.body)
//    event_title,
//    event_description,
//    location,
//    date,
//    time


//     return model.createCatName(user_id,
//    interests_id,
//    event_title,
//    event_description,
//    location,
//    date,
//    time)
//         .then(() => {
//         response.redirect('/events');
//     })
//       .catch((error) => {
//         console.error('error', error);
//         response.send(
//             `<h1>Unable to create event! :(</h1><a href="/">Back to Homepage</a>`
//         );
//     });
  }
