export const Loader = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-24">
			<svg
				width="88"
				height="88"
				viewBox="0 0 72 72"
				xmlns="http://www.w3.org/2000/svg"
				className="animate-spin-slow"
			>
				<defs>
					<radialGradient id="topGrad" cx="35%" cy="30%" r="75%">
						<stop offset="0%" stopColor="#e05a4e" />
						<stop offset="100%" stopColor="#b73024" />
					</radialGradient>
					<radialGradient id="botGrad" cx="35%" cy="70%" r="75%">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="100%" stopColor="#dcdcdc" />
					</radialGradient>
					<linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="100%" stopColor="#d6d6d6" />
					</linearGradient>
				</defs>
				<circle cx="36" cy="36" r="32" fill="#000000" opacity="0.15" />
				<path d="M4 36 A32 32 0 0 1 68 36 Z" fill="url(#topGrad)" />
				<path d="M4 36 A32 32 0 0 0 68 36 Z" fill="url(#botGrad)" />
				<circle
					cx="36"
					cy="36"
					r="32"
					fill="none"
					stroke="#1a1a1e"
					strokeWidth="2"
				/>
				<rect x="4" y="33.5" width="64" height="5" fill="#1a1a1e" />
				<circle cx="36" cy="36" r="11" fill="#1a1a1e" />
				<circle cx="36" cy="36" r="8.5" fill="url(#btnGrad)" />
				<circle
					cx="36"
					cy="36"
					r="8.5"
					fill="none"
					stroke="#1a1a1e"
					strokeWidth="2"
				/>
				<ellipse cx="24" cy="17" rx="9" ry="5" fill="#ffffff" opacity="0.35" />
			</svg>
			<p className="text-sm font-semibold text-gray-500">Cargando Pokémon...</p>
		</div>
	);
};
