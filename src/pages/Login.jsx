export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">
        
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue to Peer Circle
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-8 w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  );
}