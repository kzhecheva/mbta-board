const formatTimeHHMM = (date) => {
	return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default formatTimeHHMM;
