import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const API_KEY = 'eo_528d927c79c8ba83bf1ceac7f4b4f5b0300aea799a8072aa44ce6914850037da';
  const LIST_ID = '415990a4-8aff-11ef-bc42-2709ecc117c9';

  if (!API_KEY || !LIST_ID) {
    return res.status(500).json({ message: 'API key or List ID is missing' });
  }

  try {
    const response = await axios.post(
      `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`,
      {
        api_key: API_KEY,
        email_address: email,
        status: 'SUBSCRIBED',
      }
    );

    if (response.data && response.data.id) {
      return res.status(200).json({ message: 'Subscribed successfully' });
    } else {
      return res.status(400).json({ message: 'Unexpected response from API' });
    }
  } catch (error) {
    console.error('EmailOctopus API Error:', error.response?.data || error.message);
    if (error.response?.status === 409 || error.response?.data?.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return res.status(409).json({ message: 'This email is already subscribed' });
    } else if (error.response?.data?.error?.code === 'INVALID_PARAMETERS') {
      return res.status(400).json({ message: 'Invalid email address' });
    } else {
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  }
}