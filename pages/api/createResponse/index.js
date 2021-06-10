import { createResponse, getUsersIdUsingEmail, getEventIdFromEventTable} from "../../../database/model";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  try {
    //console.log(req.body)
    const session = await getSession({ req });
    const { user_id } = await getUsersIdUsingEmail(session.user.email);
    const { response_content } = req.body;
    //console.log(`user_id: ${user_id}`);

    const { id } = await getEventIdFromEventTable(user_id);
    //console.log(`id: ${id}`);
    const event_id = id;

    if (!response_content) {
      return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    const eventResponseDetails = await createResponse(
      user_id,
      response_content,
      event_id
    );
    console.log(`eventResponseDetails: ${eventResponseDetails}`);

    res.status(200).json(eventResponseDetails);
  } catch (error) {
        // console.error(error);
          res.status(500).send({message: ["Error creating on the server"], error: error})
    }
}
