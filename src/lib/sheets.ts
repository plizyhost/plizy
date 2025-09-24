import { google } from 'googleapis';

type LeadData = {
  timestamp: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  planName: string;
  planPrice: string;
  ip?: string | null;
};

export async function saveLead(data: LeadData): Promise<void> {
  // Check for all required environment variables
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Sheets API credentials are not configured in environment variables.');
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Use the sheet name from the environment variable, or default to 'Leads'
    const range = process.env.GOOGLE_SHEET_NAME || 'Leads'; 

    const ipLocation = data.ip || 'Unknown';

    // The order of values MUST match the column order in your Google Sheet
    const values = [
      [
        data.timestamp,
        data.orderNumber,
        data.name,
        data.email,
        data.phone,
        data.planName,
        data.planPrice,
        ipLocation,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Successfully saved order to Google Sheet:', data.orderNumber);

  } catch (err) {
    console.error('Error appending data to Google Sheet:', err);
    throw new Error('Failed to save lead to Google Sheets.');
  }
}