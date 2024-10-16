import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  const API_KEY = 'eo_528d927c79c8ba83bf1ceac7f4b4f5b0300aea799a8072aa44ce6914850037da';
  const LIST_ID = '415990a4-8aff-11ef-bc42-2709ecc117c9';

  if (!API_KEY || !LIST_ID) {
    return NextResponse.json({ message: 'API key or List ID is missing' }, { status: 500 });
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
      return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Unexpected response from API' }, { status: 400 });
    }
  } catch (error) {
    console.error('EmailOctopus API Error:', error.response?.data || error.message);
    if (error.response?.status === 409 || error.response?.data?.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return NextResponse.json({ message: 'This email is already subscribed' }, { status: 409 });
    } else if (error.response?.data?.error?.code === 'INVALID_PARAMETERS') {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'An error occurred. Please try again.' }, { status: 500 });
    }
  }
}