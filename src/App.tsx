
import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroLoader from './components/IntroLoader';
import LandingPageMimnesko from './components/LandingPageMimnesko';
import CloudPage from './components/CloudPage';
import SchemaPage from './components/SchemaPage';
import ExperiencePage from './components/ExperiencePage';

function Home() {
	const [introDone, setIntroDone] = useState(false);
	const handleIntroComplete = useCallback(() => setIntroDone(true), []);

	return (
		<>
			{!introDone && <IntroLoader onComplete={handleIntroComplete} />}
			{introDone && <LandingPageMimnesko />}
		</>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cloud" element={<CloudPage />} />
				<Route path="/schema" element={<SchemaPage />} />
				<Route path="/experience" element={<ExperiencePage />} />
			</Routes>
		</BrowserRouter>
	);
}