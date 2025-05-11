"use client"
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Provider({children}){
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    return (
        // In the place of clientId, replace the "test" with, api or key of the clientId like process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID  
        <ConvexProvider client={convex}>
            <PayPalScriptProvider options={{ clientId: "test" }}> 
                <div> {children} </div>  
            </PayPalScriptProvider> 
        </ConvexProvider> 
    )
}

export default Provider;