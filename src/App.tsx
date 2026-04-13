
import { useState, useCallback } from 'react';
import IntroLoader from './components/IntroLoader';
import LandingPageMimnesko from './components/LandingPageMimnesko';

export default function App() {
	const [introDone, setIntroDone] = useState(false);
	const handleIntroComplete = useCallback(() => setIntroDone(true), []);

	return (
		<>
			{!introDone && <IntroLoader onComplete={handleIntroComplete} />}
			{introDone && <LandingPageMimnesko />}
		</>
	);
}