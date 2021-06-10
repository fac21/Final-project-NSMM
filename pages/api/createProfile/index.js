import {
  createProfile,
  getUsersIdFromUsersTableUsingEmail,
} from "../../../database/model";
import { getSession } from "next-auth/client";

export default async (req, res) => {
    try {
         console.log(req.body)
    const session = await getSession({ req });

    const { user_id } = await getUsersIdFromUsersTableUsingEmail(
      session.user.email
    );
        console.log(`user_id: ${user_id}`);

    const { username, dob, gender, interests_id, location, bio } =
      req.body;

    if (
      !username ||
      !dob ||
      !location ||
      !gender ||
      !location ||
      !interests_id ||
      !location ||
      !bio
    ) {
      return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    const profileDetails = await createProfile(

      username,
      dob,
      gender,
      interests_id,
      location,
      bio
    );

        console.log(`profileDetails:${profileDetails}`);
    res.status(200).json(profileDetails);
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .send({ message: ["Error creating on the server"], error: error });
  }
};
