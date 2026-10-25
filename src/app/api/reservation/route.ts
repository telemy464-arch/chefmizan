import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, guests, date, time, occasion, specialRequests } = body;

    // Validation
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email, Phone, Date, Time)." },
        { status: 400 }
      );
    }

    // Generate unique booking reference
    const bookingId = "CMZ-" + Math.floor(100000 + Math.random() * 900000);

    const reservationRecord = {
      bookingId,
      name,
      email,
      phone,
      guests: Number(guests) || 2,
      date,
      time,
      occasion: occasion || "Dining",
      specialRequests: specialRequests || "None",
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Reservation confirmed! Your booking ID is ${bookingId}.`,
      data: reservationRecord,
    });
  } catch (error) {
    console.error("Reservation API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while processing your reservation." },
      { status: 500 }
    );
  }
}
