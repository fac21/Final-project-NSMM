import { getSession } from 'next-auth/client';
import { getUsersProfileUsingEmail, getUsersEventsUsingEmail } from '../../../database/model';

export default async (req, res) => {
    const session = await getSession({ req });
    console.log(session.user.email);
    const profile = await getUsersProfileUsingEmail(session.user.email);
    const events = await getUsersEventsUsingEmail(session.user.email);
    res.send({profile, events})
}