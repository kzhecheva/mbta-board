import { JsonApiDataStore } from "jsonapi-datastore";

class BoardModel {
	constructor(routeType, stationID, pageLimit) {
		this.routeType = routeType;
		this.stationID = stationID;
		this.pageLimit = pageLimit;

		const predictionsEndpoint = this._buildPredictionsEndpoint();
		this.departuresUpdateSource = new EventSource(predictionsEndpoint);
		this.dataStore = new JsonApiDataStore();
	}

	listenForDepartureUpdates(onResetDepartures) {
		this.departuresUpdateSource.addEventListener("reset", (event) => {
			const updatedDepartures = this._parsePredictionsUpdate(event);
			onResetDepartures(updatedDepartures);
		});
	}

	stopListeningForDepartureUpdates() {
		this.departuresUpdateSource.close();
	}

	_buildPredictionsEndpoint() {
		const queryParams = {
			"filter[route_type]": this.routeType,
			"filter[stop]": this.stationID,
			"page[limit]": this.pageLimit,
			include: "schedule,trip",
			// api_key: process.env.REACT_APP_MBTA_API_KEY,
			api_key: "733619ae05cd45c98e82529a21b8497f",
		};

		return "https://api-v3.mbta.com/predictions?" + new URLSearchParams(queryParams).toString();
	}

	_parsePredictionsUpdate(event) {
		/**
		 * Parses Event Stream updates from the MBTA Predictions endpoint. Because neither the prediction nor its related schedule
		 * will always have a departure time, we filter out anything missing that data. We also filter out trips that have already
		 * departed. Because we are falling back on the schedule departure time if the prediction departure time is missing, we can't
		 * simply pass a sort param to the predictions endpoint. Instead, we manually sort the data by departure time ascending once
		 * we've filtered it.
		 *
		 * TODO: find a better way to handle missing departure times if possible.
		 */

		// We need to assign our parsed events data to an object "data" property to play nice with JsonAPIDataStore
		this.dataStore.sync({ data: JSON.parse(event.data) });

		const parsedPredictions = this.dataStore.findAll("prediction").map((prediction) => this._parsePrediction(prediction));

		const filteredPredictions = parsedPredictions.filter((prediction) => {
			return prediction.departureTime && prediction.status !== "Departed";
		});
		const sorted = filteredPredictions.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));

		return sorted.slice(0, 10);
	}

	_parsePrediction(prediction) {
		// We don't appear to have access to track number any more, although at one time it appeared as a prediction attribute -
		// "stop_id": https://www.mbta.com/developers/v3-api/changelog

		return {
			departureTime: prediction?.departure_time || prediction.schedule?.departure_time,
			destination: prediction.trip.headsign,
			trainNumber: prediction.trip.name || "TBD",
			trackNumber: "TBD",
			status: prediction.status || "ON TIME",
		};
	}
}

export default BoardModel;
