import {
  createProfile,
  getUsersIdFromUsersTableUsingEmail,
} from "../../../database/model";
import { getSession } from "next-auth/client";

export default async (req, res) => {
    try {

    const session = await getSession({ req });

    const { id } = await getUsersIdFromUsersTableUsingEmail(
      session.user.email
    );
        const user_id = id;

        const { username, dob, gender,
            // interests_id,
            location, bio } =
      req.body;

    if (
      !username ||
      !dob ||
      !gender ||
      !location ||
      !bio
    ) {
      return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    const profileDetails = await createProfile(
        user_id,
      username,
      dob,
      gender,
    //   interests_id,
      location,
      bio
    );

    res.status(200).json(profileDetails);
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .send({ message: ["Error creating on the server"], error: error });
  }
};
