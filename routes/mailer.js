let nodemailer = require('nodemailer')
let secret = require('../DB/secret.js')

module.exports = function VerifyMailProcess(to,timeid) {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
  
    console.log('Credentials obtained, sending message...');
  
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: secret.mailerConfig.host,
        port: secret.mailerConfig.port,
        secure: secret.mailerConfig.secure,
        auth: {
            user: secret.mailerConfig.user,
            pass: secret.mailerConfig.password
        }
    });
  
    // Message object
    let message = {
        from: `ReactBoard <tjdwns5123@gmail.com>`,
        to: to,
        subject: '게시판 가입인증 메일입니다.',
        html: 
        `
        <div>
          <header>
            <h2>React Borad</h2>
          </header>
          <section>
            <p>
              해당 <a href="http://localhost:3000/register/verifyEmail?timeid=${timeid}" target="_self">링크</a>를 클릭하여 가입을 완료하여 주십시오.
            </p>
          </section>          
        </div>
        `
    };
  
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
  
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  
  });
}

