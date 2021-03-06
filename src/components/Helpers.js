import React from 'react'

export const Loading = () => {
  return (
    <div className="loading">
      <h3 id="loading-text">loading...</h3>
      <p id="hidden-text">if you can read this, the application may be broken... invoke your favorite dev monkey to fix it</p>
    </div>
  )
}

export const Error = () => {
  return (
    <div className="error">
      <h3 id="error-text">Error loading this element...</h3>
    </div>
  )
}
