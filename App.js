import {SafeAreaProvider} from "react-native-safe-area-context";
import AppView from "./views/AppView";

export default function App() {
	return (
		<SafeAreaProvider>
			<AppView />
		</SafeAreaProvider>
	)
}