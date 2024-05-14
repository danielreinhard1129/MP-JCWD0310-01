'use client';

import React, { PropsWithChildren } from 'react'

interface WrapperSidebarPofileProps extends PropsWithChildren{
    params:{
        id:string
    }
}

const WrapperSidebarPofile = ({children,params}:WrapperSidebarPofileProps) => {
  return (
    <div>SidebarPofile
        <div>{children}</div>
    </div>
   
  )
}

export default WrapperSidebarPofile
