# MBTA South Station Board

![mbta_board_screenshot](images/MBTA.svg.png)

## Overview

The purpose of this project was to build a website that shows a commuter rail departure board using [MBTA's API](https://www.mbta.com/developers/v3-api). 
The MBTA's API includes a number of endpoints and features for retrieving near real-time data for trains and buses throughout the MBTA system.

You can visit the deployed app, at [https://kzhecheva.github.io/mbta-board/](https://kzhecheva.github.io/mbta-board/).

This app is build in React with [create-react-app](https://github.com/facebook/create-react-app).

## Current App Features

The departure board includes:

* Departure information for pending MBTA Commuter Rail departures from South Station.

* Live updates on all ["reset" events](https://www.mbta.com/developers/v3-api/streaming)

* A simple clock updated with [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
