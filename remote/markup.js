window.qmh.markup = '<!DOCTYPE html><html><head><script src="packages/shadow_dom/shadow_dom.debug.js"></script>
<script src="packages/custom_element/custom-elements.debug.js"></script>
<script src="packages/browser/interop.js"></script>

    <meta charset="utf-8">
    <title>Sample app</title>
    <link rel="stylesheet" href="qmh.css">
    
    <script src="qmh.html_bootstrap.dart.js"></script>
    
  </head>
  <body><polymer-element name="click-counter" attributes="count">
  <template>
    <style>
      div {
        font-size: 24pt;
        text-align: center;
        margin-top: 140px;
      }
      button {
        font-size: 24pt;
        margin-bottom: 20px;
      }
    </style>
    <div>
      <button on-click="{{increment}}">Click me</button><br>
      <span>(click count: {{count}})</span>
    </div>
  </template>
  
</polymer-element>


    <h1>Qmh</h1>
    
    <p>Hello from Dart!!!</p>
    
    <div id="sample_container_id">
      <click-counter count="5"></click-counter>
    </div>

  

</body></html>'