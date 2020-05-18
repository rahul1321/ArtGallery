<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Art Gallery</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="{{ asset('css/font.css')}}">
        <link rel="stylesheet" href="{{ asset('asset/fonts/icomoon/style.css')}}">

        <link rel="stylesheet" href="{{ asset('asset/css/bootstrap.min.css')}}">
        <link rel="stylesheet" href="{{ asset('asset/css/style.css')}}">
        <link rel="stylesheet" href="{{ asset('css/custom.css')}}">
    
    </head>
    <body>
        <div id="root"></div>
        <div class="loader"></div>

        <script src={{ asset('js/app.js')}}></script>
    </body>
</html>
