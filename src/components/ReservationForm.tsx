"use client";

import { FormEvent } from "react";
import { Mail, MapPin, Phone, Plane } from "lucide-react";
import { notifyAdmin } from "@/lib/notify";
import Container from "./Container";

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  notifyAdmin("Reservation", d);
  const val = (k: string) => (d.get(k) || "").toString().trim();
  const lines = [
    "New Reservation Request",
    `Service: ${val("service")} (${val("tripType")})`,
    `Date: ${val("date")}  Time: ${val("time")}`,
    `Pickup: ${val("pickup")}`,
    val("extraPickupAddress") && `Extra pickup: ${val("extraPickupAddress")}`,
    `Drop-off: ${val("dropoff")}`,
    val("extraDropoffAddress") && `Extra drop-off: ${val("extraDropoffAddress")}`,
    val("flight") && `Flight: ${val("flight")}`,
    `Vehicle: ${val("vehicle")}`,
    `Passengers: ${val("passengers")}, Bags: ${val("luggage")}, Carry-ons: ${val("carryons")}`,
    `Child seat: ${val("childSeat")}`,
    `Name: ${val("salutation")} ${val("firstName")} ${val("lastName")}`,
    `Phone: ${val("phone")}`,
    `Email: ${val("email")}`,
    `Payment: ${val("payment")}`,
    val("comments") && `Notes: ${val("comments")}`,
  ].filter(Boolean);
  const url = `https://wa.me/96555205485?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-brand-green";

const labelClass = "text-sm font-medium text-zinc-700";

const toggleTrack =
  "relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-zinc-300 transition-colors peer-checked:bg-brand-green after:absolute after:left-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5";

const pillLabel =
  "flex cursor-pointer items-center gap-2 rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-600 has-[:checked]:border-brand-green has-[:checked]:bg-brand-green has-[:checked]:text-white";

export default function ReservationForm() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="mx-auto max-w-3xl">
        <form className="flex flex-col gap-14" onSubmit={handleSubmit}>
          {/* Pick-up & Drop-off */}
          <fieldset className="flex flex-col gap-6">
            <legend className="mb-2 text-lg font-bold tracking-wide text-zinc-900 uppercase">
              Pick-Up &amp; Drop-Off Information
            </legend>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Service Type <span className="text-brand-red">*</span>
              </label>
              <select name="service" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Airport Transfer (Most Popular)</option>
                <option>Kuwait ⇄ Saudi Border Crossing</option>
                <option>City Ride</option>
                <option>Hourly Hire</option>
                <option>Corporate Service</option>
                <option>Long-Distance Trip</option>
              </select>
            </div>

            <div className="flex gap-3">
              <label className={pillLabel}>
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  defaultChecked
                  className="sr-only"
                />
                One Way Trip
              </label>
              <label className={pillLabel}>
                <input
                  type="radio"
                  name="tripType"
                  value="round-trip"
                  className="sr-only"
                />
                Round Trip
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  Pick-Up Date <span className="text-brand-red">*</span>
                </label>
                <input type="date" name="date" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  Pick-Up Time <span className="text-brand-red">*</span>
                </label>
                <input type="time" name="time" required className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Pick-Up Address <span className="text-brand-red">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                <MapPin className="h-4 w-4 shrink-0 text-brand-green" />
                <input
                  type="text"
                  name="pickup"
                  required
                  placeholder="Enter a location"
                  className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Airline Name + Flight Number (If Applicable)
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                <Plane className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  name="flight"
                  placeholder="e.g. Kuwait Airways KU 101"
                  className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input type="checkbox" id="extraPickup" className="peer sr-only" />
              <label htmlFor="extraPickup" className={toggleTrack} />
              <label htmlFor="extraPickup" className="cursor-pointer text-sm text-zinc-600">
                Add another pick-up address
              </label>
              <div className="hidden w-full peer-checked:block">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-green" />
                  <input
                    type="text"
                    name="extraPickupAddress"
                    placeholder="Additional pick-up location"
                    className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Drop-Off Address <span className="text-brand-red">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                <MapPin className="h-4 w-4 shrink-0 text-brand-red" />
                <input
                  type="text"
                  name="dropoff"
                  required
                  placeholder="Enter a location"
                  className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input type="checkbox" id="extraDropoff" className="peer sr-only" />
              <label htmlFor="extraDropoff" className={toggleTrack} />
              <label htmlFor="extraDropoff" className="cursor-pointer text-sm text-zinc-600">
                Add another drop-off address
              </label>
              <div className="hidden w-full peer-checked:block">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-red" />
                  <input
                    type="text"
                    name="extraDropoffAddress"
                    placeholder="Additional drop-off location"
                    className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className={labelClass}>Map</span>
              <div className="h-72 w-full overflow-hidden rounded-2xl bg-zinc-200">
                <iframe
                  src="https://www.google.com/maps?q=Kuwait&output=embed"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pick-up and drop-off map preview"
                />
              </div>
            </div>
          </fieldset>

          {/* Vehicle & Luggage */}
          <fieldset className="flex flex-col gap-6">
            <legend className="mb-2 text-lg font-bold tracking-wide text-zinc-900 uppercase">
              Vehicle &amp; Luggage Detail
            </legend>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Select Your Vehicle <span className="text-brand-red">*</span>
              </label>
              <select name="vehicle" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select a vehicle
                </option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Van</option>
                <option>Luxury Sedan</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  No. of Passengers <span className="text-brand-red">*</span>
                </label>
                <input
                  type="number"
                  name="passengers"
                  min={1}
                  required
                  defaultValue={1}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  No. of Luggage / Bags <span className="text-brand-red">*</span>
                </label>
                <input
                  type="number"
                  name="luggage"
                  min={0}
                  required
                  defaultValue={0}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  No. of Carry-Ons <span className="text-brand-red">*</span>
                </label>
                <input
                  type="number"
                  name="carryons"
                  min={0}
                  required
                  defaultValue={0}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className={labelClass}>Do You Need a Child Car Seat?</span>
              <div className="flex gap-3">
                <label className={pillLabel}>
                  <input
                    type="radio"
                    name="childSeat"
                    value="no"
                    defaultChecked
                    className="sr-only"
                  />
                  No
                </label>
                <label className={pillLabel}>
                  <input
                    type="radio"
                    name="childSeat"
                    value="yes"
                    className="sr-only"
                  />
                  Yes
                </label>
              </div>
            </div>
          </fieldset>

          {/* Personal Information */}
          <fieldset className="flex flex-col gap-6">
            <legend className="mb-2 text-lg font-bold tracking-wide text-zinc-900 uppercase">
              Personal Information
            </legend>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[120px_1fr_1fr]">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Salutation</label>
                <select name="salutation" className={inputClass} defaultValue="Mr.">
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  First Name <span className="text-brand-red">*</span>
                </label>
                <input type="text" name="firstName" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>
                  Last Name <span className="text-brand-red">*</span>
                </label>
                <input type="text" name="lastName" required className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Phone Number <span className="text-brand-red">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+965 XXXX XXXX"
                  className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Email Address <span className="text-brand-red">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3.5 py-2.5 focus-within:border-brand-green">
                <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>
          </fieldset>

          {/* Billing */}
          <fieldset className="flex flex-col gap-6">
            <legend className="mb-2 text-lg font-bold tracking-wide text-zinc-900 uppercase">
              Billing Information
            </legend>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Payment Method <span className="text-brand-red">*</span>
              </label>
              <select name="payment" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select payment method
                </option>
                <option>Cash</option>
                <option>KNET</option>
                <option>Credit / Debit Card</option>
                <option>Online Payment</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Comments &amp; Special Requests</label>
              <textarea
                rows={4}
                name="comments"
                placeholder="Note: if you need more than one child safety seat, please mention it here."
                className={`${inputClass} resize-none`}
              />
            </div>
          </fieldset>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-brand-black text-base font-semibold text-white transition-colors hover:bg-zinc-800 sm:w-48"
            >
              Book Now
            </button>
            <p className="text-xs leading-5 text-zinc-500">
              By submitting this reservation form, I authorize Kuwait Taxi
              Service to charge my payment method for this and any future
              adjustments based on the actual service rendered. I confirm
              that I am the authorized account holder and that all
              information provided is accurate.
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}
