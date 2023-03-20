@extends('emails.default')

@section('content')
  <table class="inner-container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
         style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
    <tr>
      <td>
        <!--  Hero  -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
               background="#" bgcolor="3d424e"
               style="background-image:url('#'); background-size: cover; -webkit-background-size: cover; -moz-background-size: cover -o-background-size: cover; background-position: bottom center; background-repeat: no-repeat; background-color:#3d424e;border-radius:2px 2px 0px 0px;">
          <tr>
            <td height="65" width="100%" style="height:65px;"></td>
          </tr>
          <tr>
            <td>
              <!--  Caption  -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                <tr>
                  <td
                    style="text-align:center; color: #ffffff; font-family: 'Poppins', sans-serif; font-size: 30px; font-weight: 600;">
                    Welcome To
                  </td>
                </tr>
              </table>
              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                <tr>
                  <td align="center"
                      style="color: #ffffff; font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: 700; text-transform:uppercase;line-height:30px;">
                    {{$appName}}
                  </td>
                </tr>
              </table>
              <!--  End Caption  -->
            </td>
          </tr>
          <tr>
            <td height="15" width="100%" style="height:15px;"></td>
          </tr>
          <tr>
            <td>
              <!--  Sub Caption  -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0; text-align:center; color: #efefef; font-family: 'Poppins', sans-serif; font-size: 12px; letter-spacing:4px; font-weight: 400;">
                <tr>
                  <td>LIVING . EPIC . CULTURE</td>
                </tr>
              </table>
              <!--  End Sub Caption  -->
            </td>
          </tr>
          <tr>
            <td height="40" width="100%" style="height:40px;"></td>
          </tr>
          <tr>
            <td align="center">
              <!--  Download Button  -->
              <table width="200" cellpadding="0" cellspacing="0" align="center"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; background: #321FDB; border-radius:2px;"
                     class="center">
                <tr>
                  <td width="100%" height="15"></td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" align="center"
                           style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:center;">
                      <tr>
                        <td align="center" style="text-align:center;">
                          <a href="{{$tenantLoginUrl}}"
                             style="display: block; width: 100%; color: #fff; font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 400; text-decoration:none; letter-spacing:1px;">
                            Sign In
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="100%" height="15"></td>
                </tr>
              </table>
              <!--  End Download Button  -->
            </td>
          </tr>
          <tr>
            <td height="105" width="100%" style="height:105px;"></td>
          </tr>
        </table>
        <!--  End Hero  -->
        <!--  Services  -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
               style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
          <tr>
            <td height="80px" width="100%" style="height:50px;"></td>
          </tr>
          <tr>
            <td align="center">
              <table class="full_width_600" width="600" border="0" cellpadding="0" cellspacing="0" align="center"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                <tr>
                  <td style="font-size: 14px;">
                    Hi {{$firstName}}, <br> <br>
                    Thanks for signing up with us to use {{$appName}}. My name is [YOUR NAME], and I&#8217;m your
                    point-of-contact for getting up-and-running using the tool. Over the next few weeks, I’ll be
                    sending you a few more emails to help you gain maximum value from {{$appName}}.
                    For the start, you might find these resources helpful for getting going:
                    [SETUP GUIDE][HOW-TO VIDEOS][COMPANY BLOG] <br> <br>
                    If you have any difficulties with setting up the tool, we can schedule an on-boarding call for
                    next week, and I can walk you through it. In the meantime, be sure to complete your profile
                    and add your [CUSTOMER PREFERENCES] so we can send you other content that will help you get
                    started. <br> <br>
                    If you ever have questions, run into problems, consider an upgrade or anything at all,
                    don&#8217;t hesitate to reach out to us via phone [NUMBER], email [ADDRESS], or live chat
                    [CLICK-TO-CHAT], or you can connect with me directly using the contact information below.
                    Looking forward to hearing from you soon!
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px;">
                    Please use the following password to login <br>
                    <code>{{$password}}</code>
                  </td>
                </tr>
                <tr>
                  <td height="80px" width="100%" style="height:50px;"></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--  End Services  -->
        <!-- Bottom -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
               background="#" bgcolor="3d424e"
               style="background-image:url('#'); background-size: cover; -webkit-background-size: cover; -moz-background-size: cover -o-background-size: cover; background-position: bottom center; background-repeat: no-repeat; background-color:#3d424e;border-radius:0px 0px 2px 2px;">
          <tr>
            <td>
              <!--  Caption  -->
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table width="100%" border="0" cellpadding="20" cellspacing="0"
                           style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                      <tr>
                        <td>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center"
                                 style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                            <tr>
                              <td align="left"
                                  style=" text-align:left; color: #cbd8de; font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 700;line-height:24px;letter-spacing:0.5px;">
                                Regards,
                              </td>
                            </tr>
                            <tr>
                              <td align="left"
                                  style=" text-align:left; color: #cbd8de; font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 400;line-height:24px;letter-spacing:0.5px;">
                                The {{$appName}} Team
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--  End Caption  -->
            </td>
          </tr>
        </table>
        <!-- Bottom -->
      </td>
    </tr>
  </table>
@endsection
