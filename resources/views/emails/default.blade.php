<!doctype html>
<html lang="en">
<head>
  <title>Email</title>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <style type="text/css">
    html {
      width: 100%;
    }

    body {
      width: 100%;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      mso-margin-top-alt: 0px;
      mso-margin-bottom-alt: 0px;
      mso-padding-alt: 0px 0px 0px 0px;
      background: #eef1f2;
      font-family: 'Poppins', sans-serif;
    }

    a {
      text-decoration: none;
    }

    .container {
      max-width: 740px;
      height: 100%;
      margin: 10px auto 0px auto;
    }

    .inner-container {
      background: #fafafa;
      border-radius: 2px;
      box-shadow: 0 0 6px #c9d1de;
      -webkit-box-shadow: 0 0 6px #c9d1de;
      -moz-box-shadow: 0 0 6px #c9d1de;
      -o-box-shadow: 0 0 6px #c9d1de;
    }

    .back-link {
      display: block;
      text-decoration: none;
      margin-top: 80px;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      color: #3E3E3E;
      font-size: 16px;
      letter-spacing: 1px;
    }

    .back-link .back-arrow-icon {
      vertical-align: middle;
      margin-right: 10px;
    }
  </style>
  <!--  Responsive CSS  -->
  <style type="text/css">
    @media only screen and (max-width: 600px) {
      body .full_width_600 {
        width: 90% !important;
      }
    }

    @media only screen and (max-width: 700px) {
      body .full_width_700 {
        width: 100% !important;
      }

      body .txt_center {
        text-align: center !important;
      }

      body .separator {
        height: 40px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0;">
<div class="container">
  <!--  Header  -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
         style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
    <tr>
      <td align="center">
        <table class="full_width_700" width="100%" border="0" cellpadding="0" cellspacing="0" align="center"
               style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
          <tr>
            <td height="10" width="100%" style="height:10px;"></td>
          </tr>
          <tr>
            <td>
              <!--  Header Logo  -->
              <table class="full_width_700 txt_center" width="65%" align="left" border="0" cellpadding="0"
                     cellspacing="0"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                <tr>
                  <td>
                    <a href="{{$appUrl}}">
                      <!--<img src="#" alt="Unilivin" title="logo" border="0"/>-->
                      <h2 style="color: #3d424e; text-decoration: none;">{{$appName}}.</h2>
                    </a>
                  </td>
                </tr>
              </table>
              <!--  End Header Logo  -->
            </td>
          </tr>
          <tr>
            <td height="10" width="100%" style="height:10px;"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!--  End Header  -->
  <!-- Inner Container -->
  <div class="inner-container">
    @if (isset($body))
      <div style="">
        {!! $body !!}
      </div>
    @else
      @yield('content')
    @endif
  </div>
  <!-- End In Container -->
  <!--  Footer  -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center"
         style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
    <tr>
      <td align="center">
        <table class="full_width_700" border="0" cellpadding="0" cellspacing="0" align="center"
               style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
          <tr>
            <td height="30" width="100%" style="height:30px;"></td>
          </tr>
          <tr>
            <td>
              <!--  Social Icons  -->
              <table class="full_width_700 txt_center" width="235" align="center" border="0" cellpadding="0"
                     cellspacing="0"
                     style="width:235px;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                <tr>
                  <td align="right">
                    <a href="#">
                      <img src="#" alt="Twitter"
                           title="Twitter" border="0"
                           style="color: #595959; font-family: 'Poppins', sans-serif; font-size: 22px;"/>
                    </a>
                  </td>
                  <td height="1" width="25px">
                  </td>
                  <td align="left">
                    <a href="#">
                      <img src="#" alt="Twitter"
                           title="Twitter" border="0"
                           style="color: #595959; font-family: 'Poppins', sans-serif; font-size: 22px;"/>
                    </a>
                  </td>
                </tr>
              </table>
              <!--  End Social Icons  -->
              <!--  Info  -->
              <table class="full_width_700" width="100%" align="right" border="0" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                <tr>
                  <td height="30" width="100%" style="height:30px;"></td>
                </tr>
                <tr>
                  <td class="txt_center" style="text-align:center;">
                    <table class="full_width_700 txt_center" align="right" border="0" cellpadding="0" cellspacing="0"
                           style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0;">
                      <tr>
                        <td
                          style="color: #c9d1de; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400; letter-spacing:0.5px; text-transform:capitalize; text-align:center;">
                          &#169; Copyright 2021
                          <a href="{{$appUrl}}"
                             style="color: #c9d1de; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; letter-spacing:0.5px;">
                            {{$appName}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!--  End Info  -->
            </td>
          </tr>
          <tr>
            <td height="30" width="100%" style="height:30px;"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!--  End Footer  -->
</div>
</body>
</html>
