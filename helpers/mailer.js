const mailer = require('nodemailer');
const hbs = require('hbs');
const fs = require('fs');

const transporter = mailer.createTransport({
    service: "Gmail",
    auth:{
        user: "lenguasbachilleratouic@gmail.com",
        pass: "lenguasbachuic"
    }
});
// const transporter = mailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: process.env.USER,
//         pass: process.env.PASS
//     }
// });

const generateHtml = (filename, options={}) => {
    const html = hbs.compile(fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`),'utf8'))
    return html(options);
};

exports.send = (options) => {
    const html = generateHtml(options.filename,options)
    const mailOptions = {
        from: "blabla<noreply@gentefrita.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        html
    };
    return transporter.sendMail(mailOptions);
};