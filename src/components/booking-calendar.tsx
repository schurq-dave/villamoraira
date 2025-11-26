"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { differenceInDays, parseISO } from "date-fns"

interface BookingCalendarProps {
  villaId: string
  pricePerNight: number
  pricePerWeek: number
  cleaningFee: number
  serviceFee: number
  rating: number
  maxGuests: number
  unavailableDates?: string[] // Array of ISO date strings from backend iCal sync
}

export function BookingCalendar({
  villaId,
  pricePerNight,
  pricePerWeek,
  cleaningFee,
  serviceFee,
  rating,
  maxGuests,
  unavailableDates = [],
}: BookingCalendarProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [guests, setGuests] = React.useState(2)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // Convert unavailable dates to Date objects
  const disabledDates = React.useMemo(() => {
    return unavailableDates.map((dateStr) => parseISO(dateStr))
  }, [unavailableDates])

  // Calculate total price
  const calculateTotal = React.useCallback(() => {
    if (!dateRange?.from || !dateRange?.to) return 0

    const nights = differenceInDays(dateRange.to, dateRange.from)
    const weeks = Math.floor(nights / 7)
    const remainingNights = nights % 7

    const weeklyPrice = weeks * pricePerWeek
    const nightlyPrice = remainingNights * pricePerNight
    const accommodationTotal = weeklyPrice + nightlyPrice

    return accommodationTotal + cleaningFee + serviceFee
  }, [dateRange, pricePerNight, pricePerWeek, cleaningFee, serviceFee])

  const nights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0

  // Handle booking submission
  const handleBooking = async () => {
    if (!dateRange?.from || !dateRange?.to) return

    setIsLoading(true)

    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would integrate with your booking system
    console.log("[v0] Booking submitted:", {
      villaId,
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      guests,
      total: calculateTotal(),
    })

    setIsLoading(false)
    alert("Booking request submitted! You will receive a confirmation email shortly.")
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>{/* External booking module will be inserted here */}</CardHeader>
      <CardContent>
        {/* Placeholder for external booking script */}
        <div id={`booking-module-${villaId}`} className="min-h-[400px]">
          {/* External script content will render here */}
        </div>
      </CardContent>
    </Card>
  )
}
