import {Dimensions} from 'react-native';

export const getOrientation = (height = 500) => {
	return Dimensions.get("window").height > height ? "portrait" : "landscape";
};

export const setOrientationListener = (cb) => {
	Dimensions.addEventListener("change", cb);
}

export const removeOrientationListener = () => {
	Dimensions.removeEventListener("change");
}
