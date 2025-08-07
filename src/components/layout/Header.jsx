import React, { useState, useRef, useEffect } from 'react';
import Brand from "../auth/Brand.jsx";
import { Link } from "react-router-dom";
import {paths} from "../../routes/path.js";
import {useAuth} from "../../hooks/useAuth.js";
import LogoutButton from "../auth/Logout.jsx";
import ProfileImage from "../profile/ProfileImage.jsx";

const Header = () => {
    const {auth} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand / Logo */}
                    <Link to={paths.NEWSFEED} className="flex items-center space-x-3 group">
                        <div className="transition-transform duration-200 group-hover:scale-105">
                            <Brand size="small" />
                        </div>
                        <h1 className="text-primary-600 text-xl font-bold tracking-tight group-hover:text-primary-700 transition-colors duration-200">
                            bs-connect
                        </h1>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <form>
                                <input
                                    type="text"
                                    name="q"
                                    placeholder="Search people, posts..."
                                    className="block w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-gray-50/80 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200 placeholder-gray-500"
                                />
                            </form>
                        </div>
                    </div>

                    {/* Desktop Navigation & User Profile */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Navigation Links */}
                        <div className="flex items-center space-x-1">
                            <Link
                                to={paths.NEWSFEED}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100/60 rounded-lg transition-all duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                to={paths.FIND_FRIENDS}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100/60 rounded-lg transition-all duration-200"
                            >
                                Find Friends
                            </Link>
                        </div>

                        {/* User Profile Section */}
                        {auth.token ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-3 p-1.5 text-sm bg-white hover:bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    type="button"
                                >
                                    <ProfileImage image={auth.user?.profile_image} size="small" className="w-8 h-8 ring-2 ring-white"/>
                                    <div className="hidden lg:block text-left">
                                        <div className="text-sm font-medium text-gray-900 truncate max-w-24">
                                            {auth.user?.name}
                                        </div>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-14 w-64 bg-white divide-y divide-gray-100 rounded-xl shadow-xl border border-gray-200/60 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-4 bg-gradient-to-r from-primary-50 to-primary-100/50">
                                            <div className="flex items-center space-x-3">
                                                <ProfileImage image={auth.user?.profile_image} size="small" className="w-12 h-12 ring-2 ring-white shadow-sm"/>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{auth.user?.name}</div>
                                                    <div className="text-xs text-gray-600 truncate max-w-32">{auth.user?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <Link
                                                to={`/user/${auth.user?.id}`}
                                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg>
                                                My Profile
                                            </Link>
                                            <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                                                <LogoutButton />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={paths.LOGIN}
                                className="px-6 py-2.5 text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary-500/20"
                            >
                                Log in
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                    id="mobile-menu"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200/50">
                        {/* Mobile Search Bar */}
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <form>
                                <input
                                    name="q"
                                    type="text"
                                    placeholder="Search people, posts..."
                                    className="block w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-gray-50/80 border border-gray-300/60 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
                                />
                            </form>
                        </div>

                        {/* Mobile Navigation Links */}
                        <Link
                            to={paths.NEWSFEED}
                            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to={paths.FIND_FRIENDS}
                            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Find Friends
                        </Link>

                        {/* Mobile Auth Section */}
                        {auth.token ? (
                            <div className="pt-4 border-t border-gray-200/50">
                                <div className="flex items-center space-x-3 px-4 py-3">
                                    <ProfileImage image={auth.user?.profile_image} size="small" className="w-10 h-10 ring-2 ring-white shadow-sm"/>
                                    <div>
                                        <div className="text-base font-medium text-gray-900">{auth.user?.name}</div>
                                        <div className="text-sm text-gray-500 truncate">{auth.user?.email}</div>
                                    </div>
                                </div>
                                <Link
                                    to={`/user/${auth.user?.id}`}
                                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Profile
                                </Link>
                                <div className="px-4 py-3">
                                    <LogoutButton/>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-gray-200/50">
                                <Link
                                    to={paths.LOGIN}
                                    className="block mx-4 px-6 py-3 text-center text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;