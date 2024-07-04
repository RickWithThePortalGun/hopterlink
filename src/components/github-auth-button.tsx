'use client'

import { signIn, useSession } from 'next-auth/react'
// import { useSearchParams } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { Button } from './ui/button'

export default function GoogleSignInButton() {
  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get('callbackUrl');
  const router = useRouter()
  const { data: session, status } = useSession()

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push('/')
    return
  }
  return (
    <Button
      className="w-full"
      variant="secondary"
      type="button"
      onClick={() => {
        void signIn('google', { callbackUrl: '/' })
      }}
      // signIn('github', { callbackUrl: callbackUrl ?? '/dashboard' })
    >
      {status === 'loading' ? (
        <Loader size={14} />
      ) : (
        <div className="flex gap-2 items-center">
          <FcGoogle />
          Continue with Google
        </div>
      )}
    </Button>
  )
}
