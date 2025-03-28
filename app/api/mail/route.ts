import { NextRequest, NextResponse } from 'next/server';
import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(request: NextRequest) {
    try {
      const { email } = await request.json();
      
      // Validate required fields
      if (!email) {
        return NextResponse.json(
          { error: 'Email Id are required' }, 
          { status: 400 }
        );
      }
      
      // Send email notification
      const mailgun = new Mailgun(FormData);
      
      if (!process.env.MAILGUN_API_KEY) {
        throw new Error('MAILGUN_API_KEY environment variable is not defined');
      }
      
      const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY,
      });
  
      try {
        const response = await mg.messages.create("sandbox3b5e4ee972f7419a9733846867b9fb99.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox3b5e4ee972f7419a9733846867b9fb99.mailgun.org>",
            to: ["TRUST LEGAL <info@trustlegal.ca>"],
            subject: "New Launch Notification Subscriber",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                        .container { max-width: 600px; margin: 0 auto; padding: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                        .header { background: linear-gradient(135deg, #c8102e 0%, #982630 100%); padding: 30px; text-align: center; }
                        .header h1 { color: #ffffff; margin: 0; font-weight: 600; font-size: 28px; }
                        .content { padding: 30px; background-color: #ffffff; }
                        .notification-box { background-color: #f7f9fc; border-left: 4px solid #c8102e; padding: 20px; margin-bottom: 20px; border-radius: 0 4px 4px 0; }
                        .email-card { background-color: #f5f5f5; padding: 15px; border-radius: 6px; margin-top: 20px; text-align: center; }
                        .highlight { color: #c8102e; font-weight: bold; }
                        .footer { font-size: 12px; color: #777; border-top: 1px solid #eee; padding: 20px; text-align: center; background-color: #f9f9f9; }
                        .btn { display: inline-block; background: #2D4B73; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>TRUST LEGAL <span style="color:#E6E6E6;">Canada</span></h1>
                        </div>
                        <div class="content">
                            <div class="notification-box">
                                <h2 style="color:#2D4B73; margin-top:0;">New Website Launch Subscriber</h2>
                                <p>You have a new subscriber waiting for your website launch! Someone has shown interest in TRUST LEGAL's services.</p>
                            </div>
                            
                            <div class="email-card">
                                <h3 style="margin-top:0;">Subscriber Details</h3>
                                <p>Email: <span class="highlight">${email}</span></p>
                                <p>Signup Date: ${new Date().toLocaleDateString('en-CA')}</p>
                            </div>
                            
                            <p style="margin-top:25px;">This email has been automatically added to your launch notification list. Remember to follow up once the website is ready!</p>
                        </div>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} TRUST LEGAL Canada. All rights reserved.</p>
                            <p>This is an automated notification from your website system.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });
        
      } catch (error) {
        console.log(error);
      }
  
  
  
      
      return NextResponse.json("Mail Sended successfully", { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }
  }