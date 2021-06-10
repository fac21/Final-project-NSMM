import { createResponse, getUsersIdUsingEmail, getEventIdFromEventTable} from "../../../database/model";
import { getSession } from "next-auth/client";

export default async (req, res) => {
    try {
        const session = await getSession({ req });

      const { user_id }= await getUsersIdUsingEmail(session.user.email);

        const { response_content } = req.body
        const { event_id }= await getEventIdFromEventTable(user_id); 

        if (
          !response_content
        ) {
          return res
            .status(422)
            .send({ error: ["Missing one or more fields"] });
        }

      const eventDetails = await createResponse(
        user_id,
        response_content,
        event_id,
      );
      res.status(200).json(eventDetails);

    } catch (error) {
        // console.error(error);
        res.status(500).send({message: ["Error creating on the server"], error: error})
    }
}
