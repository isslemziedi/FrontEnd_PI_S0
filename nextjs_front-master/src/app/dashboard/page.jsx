'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) {
      // If there's no user data in local storage, redirect to login page
      router.push('/signin');
    } else {
      setUser(loggedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    router.push('/signin'); // Redirect to sign-in page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to your Dashboard!</h1>
        <p className="text-gray-500 mt-4">You are successfully logged in.</p>
        {user && (
          <div className="mt-6">
            <p className="text-gray-700">Logged in as: <strong>{user.email}</strong></p>
          </div>
        )}
        <div className="mt-8 space-y-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
