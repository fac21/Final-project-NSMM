import { createEvent, getUsersIdUsingEmail } from "../../../database/model";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    const { user_id } = await getUsersIdUsingEmail(session.user.email);

    const {
      interest_id,
      event_title,
      location,
      date,
      time,
      event_description,
    } = req.body;

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
      return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    const eventDetails = await createEvent(
      user_id,
      interest_id,
      event_title,
      location,
      date,
      time,
      event_description
    );
    res.status(200).json(eventDetails);
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .send({ message: ["Error creating on the server"], error: error });
  }
};
