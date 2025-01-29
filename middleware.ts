import { NextResponse } from "next/server"

export const middleware = (req: Request) => {
    return NextResponse.next()
}