

import { getCurrent } from '@/features/auth/actions'
import { SignInCard } from '@/features/auth/components/SignInCard'
import { redirect } from 'next/navigation'
import React from 'react'

const SignInPage = async () => {
  const user = await getCurrent()
  console.log("----",{user})

  if (user) redirect("/")
  return (
    <div >
      <SignInCard />
    </div>
  )
}

export default SignInPage
