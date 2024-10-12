# weather-app

A project from The Odin Project (Full Stack Javascript).

A weather app webpage is built using HTML, CSS, Javascript, and Visual Crossing API.

> A preview is available [here](http://frarosset.github.io/weather-app).

The design is inspired by the Google Weather app.

- I've used Lottie files for the animations. They can be stopped in the app settings.
- I've used localStorage to save a favourite location and some bookmarked locations. If a favourite location is set, its weather data are shown on page refresh.
- I've used [navigator.geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) to add the possibility to get the weather estimating current position. In this case the latitude/longitude is shown, instead of the location. I might improve that in the future.  Of course this requires Geolocation permission.
- The background color should change based on the time of the day and weather conditions (more or less, to reflect the sky color).
