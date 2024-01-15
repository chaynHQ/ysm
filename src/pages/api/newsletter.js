import md5 from 'md5';
import mailchimp from '../../config/mailchimp';

export default async (req, res) => {
  const { email, displayName } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const emailHash = md5(email.toLowerCase());

  const audienceId = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
  let response = {};

  try {
    switch (req.method) {
      case 'GET':
        response = await mailchimp.lists.getListMember(
          audienceId, emailHash,
        );
        if (res.status === 404) {
          return res.status(201).json({ status: 'not subscribed' });
        }
        return res.status(200).json({ status: response.status });
      case 'PUT':
        if (!displayName) {
          return res.status(400).json({ error: 'Display name is required' });
        }
        response = await mailchimp.lists.addListMember(
          audienceId,
          {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
              FNAME: displayName,
            },
          },
        );

        return res.status(201).json({ status: 'subscribed' });
      case 'DELETE':
        response = await mailchimp.lists.deleteListMember(
          audienceId, emailHash,
        );
        return res.status(200).json({ status: 'unsubscribed' });
      default:
        return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    return res.status(200).json({ error: error.message || error.toString() });
  }
};
