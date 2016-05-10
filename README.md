# fauxmo-milight
Milight Hub emulating a Wemo switch for use by Amazon Echo.  Supports on/off functionality.

Requires:
  - python
  - node
  - [milight(s)](http://www.amazon.com/Mi-Light-Expansion-Bulb-Million-Dimmable/dp/B014J5X382) and a [controller](http://www.amazon.com/LEDENET%C2%AE-WiFi-Bridge-Controller-Light/dp/B00HCLRBZM)
  - server - raspberry pi, for example
  - 

Instructions:
  - edit list in fauxmo/fauxmo.py to reflect your network, then start using python
  - edit node milight/milight.js to reflect your network, npm install, then npm start
  - tell Alexa/Echo to discover new devices
  - tell Alexa/Echo to tunr on/off your milight(s)

Todo:
  - convert python to javascript (maybe)
  - install as a service, crontab addition, or something similar
  - colors (big wish, don't bet on it)

  
