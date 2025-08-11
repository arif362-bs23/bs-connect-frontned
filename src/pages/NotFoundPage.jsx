import React from "react";

const NotFoundPage = () => {

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
            <main
                role="main"
                className="relative max-w-4xl w-full bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg p-10 md:p-16 text-center overflow-hidden"
            >
                {/* Decorative circle behind content */}
                <div className="pointer-events-none absolute -right-24 -top-24 w-64 h-64 rounded-full bg-blue-50/60 blur-3xl"></div>

                {/* Badge + 404 */}
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center mb-6">
                        <h1 className="text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight mr-4">
                            404
                        </h1>

                        <span className="ml-2 inline-block transform rotate-6 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-sm select-none">
              Page Not Found
            </span>
                    </div>

                    {/* Illustration */}
                    <div
                        aria-hidden="true"
                        className="mx-auto w-48 h-36 md:w-56 md:h-44 mb-6"
                    >
                        <svg
                            viewBox="0 0 240 160"
                            className="w-full h-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="240" height="160" rx="20" fill="#EFF6FF" />
                            <g transform="translate(26,24)">
                                <rect width="188" height="96" rx="8" fill="#FFFFFF" stroke="#DBEAFE" />
                                <circle cx="24" cy="24" r="10" fill="#BFDBFE" />
                                <rect x="44" y="16" width="120" height="12" rx="4" fill="#E0F2FE" />
                                <rect x="12" y="48" width="164" height="8" rx="3" fill="#EEF2FF" />
                                <rect x="12" y="62" width="120" height="8" rx="3" fill="#EEF2FF" />
                                <rect x="12" y="76" width="80" height="8" rx="3" fill="#EEF2FF" />
                            </g>
                        </svg>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                        Oops — we can’t find that page
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto mb-6">
                        The link you followed may be broken, or the page may have been removed.
                        Try returning home or use the back button.
                    </p>

                </div>

                {/* Subtle pattern background */}
                <div className="absolute inset-0 -z-10 opacity-40">
                    <svg
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 900 600"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id="grad" x1="0" x2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.9" />
                            </linearGradient>
                        </defs>
                        <rect width="900" height="600" fill="url(#grad)" />
                        <g fill="#eef2ff" opacity="0.9">
                            <circle cx="120" cy="80" r="64" />
                            <circle cx="780" cy="520" r="96" />
                            <circle cx="620" cy="120" r="40" />
                        </g>
                    </svg>
                </div>
            </main>
        </div>
    );
};

export default NotFoundPage;
