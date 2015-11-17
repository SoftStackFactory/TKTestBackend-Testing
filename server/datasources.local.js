module.exports = {
    mongo : {
       // url: 'ec2-52-24-206-212.us-west-2.compute.amazonaws.com'
    },
    emailConnector: {
        transports: [{
           type: "smtp",
           host: "smtp.sendgrid.net",
           secure: false,
           port: 587,
           tls: {
             rejectUnauthorized: false
           },
           auth: {
             user: process.env.SENDGRID_USERNAME,
             pass: process.env.SENDGRID_PASSWORD
           }
        }]
    }
};