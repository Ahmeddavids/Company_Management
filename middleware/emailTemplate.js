exports.signUpTemplate = (otp, fullName) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body style="font-family: 'Poppins', Arial, sans-serif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; border:2px solid black;">
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background-color: #0e0d3a; padding: 40px; text-align: center; color: white; font-size: 24px;">
                            Verify your Email
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td class="body" style="padding: 30px; text-align: left; font-size: 25px; line-height: 1.6;">
                        Hello, ${fullName}  <br>
                       
                        <br><br>
                          This is Your one-Time-Password to Verify that You are 
                          a New User
                        </td>
                    </tr>

                    <!-- Call to action Button -->
                    <tr>
                        <td style="padding: 0px 40px 0px 40px; text-align: center;">
                            <!-- CTA Button -->
                            <table cellspacing="0" cellpadding="0" style="margin: auto;">
                                <tr>
                                    <td align="center" style="background-color: #0b0830; padding: 10px 20px; border-radius: 5px;">
                                        <a href="#" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 30px; gap: 10px;">${otp}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="body" style="padding: 40px; text-align: center; font-size: 19px; line-height: 1.6;">
                           And This Code Expires in <span style="color: red;">10 Minutes</span>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td class="footer" style="background-color: #080516; padding: 40px; text-align: center; color: white; font-size: 14px;">
                        Copyright &copy; 2024 | Eip enterprice
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
 `
}


exports.forgotPasswordTemplate = (otp, fullName) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body style="font-family: 'Poppins', Arial, sans-serif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; border:2px solid black;">
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background-color: #0e0d3a; padding: 40px; text-align: center; color: white; font-size: 24px;">
                            Verify your Email
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td class="body" style="padding: 30px; text-align: left; font-size: 25px; line-height: 1.6;">
                        Hello, ${fullName}  <br>
                       
                        <br><br>
                          This is Your one-Time-Password to Reset you New password
                        </td>
                    </tr>

                    <!-- Call to action Button -->
                    <tr>
                        <td style="padding: 0px 40px 0px 40px; text-align: center;">
                            <!-- CTA Button -->
                            <table cellspacing="0" cellpadding="0" style="margin: auto;">
                                <tr>
                                    <td align="center" style="background-color: #0b0830; padding: 10px 20px; border-radius: 5px;">
                                        <a href="#" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 30px; gap: 10px;">${otp}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="body" style="padding: 40px; text-align: center; font-size: 19px; line-height: 1.6;">
                           And This Code Expires in <span style="color: red;">10 Minutes</span>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td class="footer" style="background-color: #080516; padding: 40px; text-align: center; color: white; font-size: 14px;">
                        Copyright &copy; 2024 | Eip enterprice
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
 `
}