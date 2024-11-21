import nodemailer from "nodemailer";

 const  SendMail = async (username,email,deck_name) => {
    
    
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port :465,
        secure : true,
        logger : false,
        debug:true,
        auth: {
            user: process.env.GMAIL_ID, 
            pass: process.env.GMAIL_PASS,
        },
        tls:{
          rejectUnauthorized : true
        }
    });
  
    const mailOptions = {
      from: process.env.GMAIL_ID, 
      to: email,
      subject: 'Important: Deck Removal Notification',
      html :`<h3>Dear ${username},</h3>

<p>We regret to inform you that your deck titled <strong>"${deck_name}"</strong> has been found to violate the StudyBuddies Community Guidelines.</p>

<p>As a result, the deck has been removed from the platform.</p>

<p>We encourage you to review our Community Guidelines and ensure that all content you upload adheres to these standards.</p>

<p><strong>Important:</strong> If you continue to violate the rules, your account may face further restrictions.</p>

<p>Thank you for your understanding and cooperation.</p>

<p>Best regards,</p>
<p>The StudyBuddies Team</p>.`
}

  
    try {
      await transporter.SendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };
  
  export default SendMail;