import React from 'react'
import useAuth from './useAuth'

export default function Dasboard({ code }) {
   const accessToken = useAuth(code)

   return (
      <div>
         {code}
      </div>
   )
}
