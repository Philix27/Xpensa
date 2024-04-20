"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import { Button, Icons } from "@/comps"
import { AppStores, NavItem, cn } from "@/lib"
import { MenuIcon, SidebarClose } from "lucide-react"
import { useAccount, useConnect, useEnsName } from "wagmi"

import { ThemeToggle } from "@/app/comps"

import { siteConfig } from "./site"

interface MainNavProps {
  items?: NavItem[]
}

export function NavbarHeader({ items }: MainNavProps) {
  const { isConnected } = useAccount()
  const [hideConnectBtn, setHideConnectBtn] = useState(false)
  const { isSidebarOpen, setIsSidebarOpen } = AppStores.useSettingsStore()

  useEffect(() => {
    const w = window as any
    if (w.ethereum && w.ethereum.isMiniPay) {
      setHideConnectBtn(true)
      // connect()
    }
  }, [])

  return (
    <header className="bg-secondary sticky top-0 z-40 w-full border-b">
      <div className="container flex h-[60px] items-center justify-between">
        <div className="flex gap-6 md:gap-10 ">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <nav className="flex gap-6">
            {isConnected ? (
              <Link
                href={"/dashboard"}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                Dashboard
              </Link>
            ) : (
              <Button>Connect</Button>
            )}
          </nav>
        </div>

        <div className="flex items-center justify-center md:gap-x-3">
          <div className="mr-4">
             <ThemeToggle />
         </div>

          <div
            className={"md:hidden"}
            onClick={() => {
              console.log("Hey")
            }}
          >
            {isSidebarOpen ? <SidebarClose /> : <MenuIcon />}
            {/* {isSidebarOpen ? (
              <SidebarClose onClick={setIsSidebarOpen(true)} />
            ) : (
              <MenuIcon onClick={setIsSidebarOpen(false)} />
            )} */}
          </div>
        </div>
      </div>
    </header>
  )
}

// {
//   isSidebarOpen ? (
//     <SidebarClose onClick={setIsSidebarOpen(true)} />
//   ) : (
//     <MenuIcon />
//   )
// }
// {
//   isSidebarOpen ? (
//     <SidebarClose onClick={store.setIsSidebarOpen(true)} />
//   ) : (
//     <MenuIcon onClick={store.setIsSidebarOpen(false)} />
//   )
// }