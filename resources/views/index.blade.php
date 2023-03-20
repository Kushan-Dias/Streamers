<!DOCTYPE html>
<html lang="en-US">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}" />

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Styles -->
  <link href="{{ global_asset('css/app.css') }}" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/@coreui/icons@2.0.0-beta.3/css/all.min.css">
  <script src="https://kit.fontawesome.com/7452e225a6.js" crossorigin="anonymous"></script>
</head>

<body>
<div id="app">
</div>
</body>
<script src="{{ global_asset('js/main.js') }}"></script>

</html>
