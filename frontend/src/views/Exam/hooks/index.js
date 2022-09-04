import { useLocation } from "react-router-dom";

export const useQuery = () => {
	const rt = new URLSearchParams(useLocation().search);
	return new URLSearchParams(useLocation().search);
};
