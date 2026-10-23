import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { prefersReducedMotion } from './lib/motion'
import './index.css'

// The admin portal is its own bundle: visitors never download it, admins never load the 3D field
const isAdmin = window.location.pathname.startsWith('/dssa-portals')
const Root = isAdmin ? lazy(() => import('./admin/AdminApp')) : lazy(() => import('./App'))

// Lets CSS hide elements that GSAP will reveal, only when animations will actually run
if (!isAdmin && !prefersReducedMotion()) document.documentElement.classList.add('js-motion')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Root />
    </Suspense>
  </React.StrictMode>,
)
