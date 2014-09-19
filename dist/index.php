<!DOCTYPE html>
<html lang="no">
<head>
    <meta http-equiv='Content-type' content='text/html; charset=utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Picture Element Demo</title>
    <link href="css/style.min.css" type="text/css">
</head>

<body>
<div class="container">
	<div class="col-md-12">
<h1>Picture element demo</h1>

<p>Fra en bloggartikkel på <a href="http://www.inbeta.no/?p=928">Inbeta.no</a></p>
<p>Hvis du ser bildet med <b>SMALL</b> printet øverst til høyre, støtter ikke din nettleser det nye
picture-elementet. Dersom du ser HIRES eller MEDIUM, så skaler websiden opp eller ned for å se 
at den endrer seg dynamisk. Dette er ikke gjort i CSS, men innenfor rammene til
det nye elementet i HTML-standarden.</p>


<picture>
  <source media="(min-width: 45em)" srcset="img/large.jpg">
  <source media="(min-width: 32em)" srcset="img/med.jpg">
  <img src="img/small.jpg" width="300" height="363" alt="Rembrandt - selvportrett.">
</picture>

<p><strong>Kode:</strong></p>
<pre>
&lt;picture&gt; 
&lt;source media=&quot;(min-width: 45em)&quot; srcset=&quot;img/large.jpg&quot;&gt; 
&lt;source media=&quot;(min-width: 32em)&quot; srcset=&quot;img/med.jpg&quot;&gt; 
&lt;img src=&quot;img/small.jpg&quot; width=&quot;300&quot; height=&quot;363&quot; alt=&quot;Rembrandt - selvportrett.&quot;&gt; 
&lt;/picture&gt;
</pre>

</div>
</div>
<!-- /div.container -->

</body>
<!-- Contains jQuery, React and various plugins -->
<script type="text/javascript" src="./js/libs.min.js"></script>
<!-- Contains compiled js (included jsx) -->
<script type="text/javascript" src="./js/scripts.min.js"></script>
</html>
