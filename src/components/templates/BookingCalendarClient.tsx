"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const BookingCalendar = dynamic(() => import("@/components/booking-calendar").then((mod) => mod.BookingCalendar), {
  loading: () => (
    <Card className="sticky top-24 animate-pulse">
      <CardHeader>
        <div className="h-20 bg-muted rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  ),
  ssr: false,
})

interface BookingCalendarClientProps {
  villaId: string
  pricePerNight: number
  pricePerWeek: number
  cleaningFee: number
  serviceFee: number
  rating: number
  maxGuests: number
  unavailableDates: string[]
  icalUrl?: string
}

export function BookingCalendarClient(props: BookingCalendarClientProps) {
  return <BookingCalendar {...props} />
}
