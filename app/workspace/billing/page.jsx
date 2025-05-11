"use client"

import { Button } from "@/components/ui/button"
import { UserDetailContext } from "@/context/UserDetailContext"
import { api } from "@/convex/_generated/api"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useMutation } from "convex/react"
import { CircleDollarSign } from "lucide-react"
import { useContext, useEffect } from "react"
import { toast } from "sonner"

export const creditsPlans = [
    {
        credits: 80,
        cost: 2,

    },
    {
        credits: 160,
        cost: 5,

    },
    {
        credits: 240,
        cost: 8,

    },
    {
        credits: 320,
        cost: 11,

    },
    {
        credits: 400,
        cost: 14,

    },
]

function Billing() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const updateUserCredits = useMutation(api.users.updateUserCredits)
    const onPaymentSuccess = async(cost, credits) => {
        setUserDetail( prev => ({
            ...prev,
            credits: Number(userDetail?.credits) + credits
        }))

        const resp = await UpdateUserCredits({
            credits: Number(userDetail?.credits) + credits,
            uid: userDetail?._id
        })

        console.log(resp)
        toast('Credits added Successfully!')
    }

    return (
        <div>
            <h2 className="font-bold text-3xl"> Credits </h2>
            <div className="p-4 border rounded-xl flex justify-between">
                <div>
                    <h2 className="font-bold text-xl"> Total Credits</h2>
                    <h2 className="text-sm"> 10 Credits = 1 Video</h2>
                </div>
                <h2 className="font-bold text-3xl"> {userDetail?.credits} </h2>
            </div>
            <p className="text-sm p-5 text-gray-500 max-w-2xl"></p>
            <div className="mt-5">
                <h2 className="font-bold text-2xl"> Buy More Credits! </h2>
                <div className="">
                    {creditsPlans.map((plan, index) => (
                        <div key={index} className="p-5 mt-3 border rounded-xl max-w-2xl">
                            <h2 className="text-xl flex gap-2 items-center"> <CircleDollarSign /> <strong> {plan?.credits} </strong> </h2>
                            <div className="flex gap-2 items-center">
                                <h2 className="font-medium text-xl"> {plan.cost} $</h2>
                                {/* <Button> Buy Now </Button> */}
                                <PayPalButtons
                                style={{'layout': 'horizontal'}} 
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units:[
                                            {
                                                amount:{
                                                    value: plan.cost,
                                                    currency_code: 'USD'
                                                }
                                            }
                                        ]
                                    })
                                }}
                                onApprove={() => onPaymentSuccess(plan.cost, plan.credits)}
                                onCancel={() => toast('Payment Cancelled')}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}