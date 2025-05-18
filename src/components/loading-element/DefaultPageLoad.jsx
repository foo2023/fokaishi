const DefaultPageLoad = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-screen z-50">
      <div className="top-0 left-0 w-full h-screen bg-gray-950/25 backdrop-blur-xs relative" />
      <div className="absolute">
        <span
          className="inline-block"
        >
          <span className="w-20 h-20 text-white inline-block relative z-0">
            <svg className="loading-spinner-bounder" viewBox="25 25 50 50">
              <circle
                className="loading-spinner"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="4.3"
                strokeMiterlimit="10"
              ></circle>
            </svg>
          </span>
        </span>
      </div>
    </div>
  )
}

export default DefaultPageLoad
