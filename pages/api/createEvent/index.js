import { createEvent } from "../../../database/model";

// export default async (req, res) => {
  //const user_id = req.params
  // const { interests_id, event_title, event_description, location, date, time }= req.body;
  // console.log(interests_id);
  // console.log(user_id);
  //console.log(req.body);
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
//};


export default async (req, res) => {
    try {
         console.log(req.body)
        const { interest_id, event_title,  location, date, time, event_description } = req.body

        if (
          !interest_id ||
          !event_title ||
          !location ||
          !date ||
          !location ||
          !date ||
          !time ||
          !event_description
        ) {
          return res
            .status(422)
            .send({ error: ["Missing one or more fields"] });
        }

        const eventDetails = await createEvent(
          interest_id,
          event_title,
          location,
          date,
          time,
          event_description
        );

        res.status(200).json(eventDetails)

    } catch (error) {
        // console.error(error);
        res.status(500).send({message: ["Error creating on the server"], error: error})
    }
}
