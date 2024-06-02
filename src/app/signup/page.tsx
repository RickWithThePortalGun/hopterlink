'use client'
import PathContainer from '@/components/PathContainer'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'

const page = () => {
  return (
    <PathContainer>
      <div className="w-screen h-screen flex flex-row">
        <div className="bg-transparent w-1/2">
          <div
            className="w-full h-screen flex items-center justify-center px-4
              theme-zinc"
          >
            <div
              className="rounded-lg border bg-secondary text-card-primary shadow-sm
                w-full max-w-sm"
            >
              <div
                className="flex flex-col text-center justify-center items-center
                  space-y-1.5 p-6 my-6"
              >
                <h3 className="font-semibold tracking-tight text-2xl">
                  Sign Up
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter your details below to join
                  Hopterlink.
                </p>
              </div>
              <div className="p-6 pt-0 grid gap-4">
                <div className="grid gap-2">
                  <Label
                    className="text-sm font-medium leading-none
                      peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input
                      bg-background px-3 py-2 text-sm ring-offset-background
                      file:border-0 file:bg-transparent file:text-sm
                      file:font-medium placeholder:text-muted-foreground
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-ring focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="user@example.com"
                    required
                    control-id="ControlID-1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    className="text-sm font-medium leading-none
                      peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input
                      bg-background px-3 py-2 text-sm ring-offset-background
                      file:border-0 file:bg-transparent file:text-sm
                      file:font-medium placeholder:text-muted-foreground
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-ring focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    required
                    placeholder="●●●●●●●●●"
                    control-id="ControlID-2"
                  />
                </div>
              </div>
              <div className="flex items-center p-6 pt-0">
                <Button
                  className="inline-flex items-center justify-center whitespace-nowrap
                    rounded-md text-sm font-medium ring-offset-background
                    transition-colors focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-ring
                    focus-visible:ring-offset-2 disabled:pointer-events-none
                    disabled:opacity-50 bg-primary text-primary-foreground
                    hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  control-id="ControlID-3"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary border-r-2 w-1/2 relative">
          <div className="top-10 right-10 absolute">
            <Logo />
          </div>
        </div>
      </div>
    </PathContainer>
  )
}

export default page
