const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.EMAIL_FROM_NAME || 'ShopSwift'} <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    const info = await transporter.sendMail(message);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  // Welcome email template
  welcome: (name) => ({
    subject: 'Welcome to ShopSwift!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ShopSwift</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ShopSwift!</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #2563eb; margin-top: 0;">Hello ${name}!</h2>
            <p>Thank you for joining ShopSwift, your ultimate e-commerce destination!</p>
            <p>We're excited to have you on board. Here's what you can do now:</p>
            <ul style="color: #666;">
              <li>Browse our extensive product catalog</li>
              <li>Add items to your wishlist</li>
              <li>Enjoy fast and secure checkout</li>
              <li>Track your orders in real-time</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Start Shopping</a>
            </div>
            <p style="color: #666; font-size: 14px;">If you have any questions, feel free to contact our support team.</p>
          </div>
        </body>
      </html>
    `,
    text: `Welcome to ShopSwift, ${name}! Thank you for joining us. Start shopping at ${process.env.FRONTEND_URL || 'http://localhost:3000'}`
  }),

  // Email verification template
  emailVerification: (name, verificationUrl) => ({
    subject: 'Verify Your Email - ShopSwift',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #2563eb; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Verify Your Email</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #2563eb;">Hello ${name}!</h2>
            <p>Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
            </div>
            <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="color: #2563eb; word-break: break-all; font-size: 14px;">${verificationUrl}</p>
            <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
          </div>
        </body>
      </html>
    `,
    text: `Hello ${name}! Please verify your email by visiting: ${verificationUrl}`
  }),

  // Password reset template
  passwordReset: (name, resetUrl) => ({
    subject: 'Password Reset - ShopSwift',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc2626; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Password Reset</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #dc2626;">Hello ${name}!</h2>
            <p>You requested a password reset for your ShopSwift account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
            <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
          </div>
        </body>
      </html>
    `,
    text: `Hello ${name}! Reset your password by visiting: ${resetUrl}`
  }),

  // Order confirmation template
  orderConfirmation: (name, orderData) => ({
    subject: `Order Confirmation #${orderData.orderNumber} - ShopSwift`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #10b981; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #10b981;">Thank you, ${name}!</h2>
            <p>Your order has been confirmed and is being processed.</p>
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2563eb;">Order Details</h3>
              <p style="margin: 5px 0;"><strong>Order Number:</strong> #${orderData.orderNumber}</p>
              <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleDateString()}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Total:</strong> $${orderData.total}</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/orders/${orderData._id}" style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Track Order</a>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Thank you ${name}! Your order #${orderData.orderNumber} has been confirmed. Total: $${orderData.total}`
  })
};

// Helper functions to send specific emails
const sendWelcomeEmail = async (email, name) => {
  const template = emailTemplates.welcome(name);
  return sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    message: template.text
  });
};

const sendEmailVerification = async (email, name, verificationUrl) => {
  const template = emailTemplates.emailVerification(name, verificationUrl);
  return sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    message: template.text
  });
};

const sendPasswordResetEmail = async (email, name, resetUrl) => {
  const template = emailTemplates.passwordReset(name, resetUrl);
  return sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    message: template.text
  });
};

const sendOrderConfirmationEmail = async (email, name, orderData) => {
  const template = emailTemplates.orderConfirmation(name, orderData);
  return sendEmail({
    email,
    subject: template.subject,
    html: template.html,
    message: template.text
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  emailTemplates
};