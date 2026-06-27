"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        message: form.get("message"),
        interest: form.get("interest"),
      }),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-semibold text-navy">Message Sent!</h3>
        <p className="mt-2 text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" required /></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" /></div>
        <div><Label htmlFor="interest">I&apos;m interested in...</Label><Input id="interest" name="interest" placeholder="Buying, Selling, Renting" /></div>
      </div>
      <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={5} required /></div>
      <Button type="submit" variant="gold" size="lg">Send Message</Button>
    </form>
  );
}

export function ValuationForm() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        interest: "Home Valuation",
        message: form.get("address"),
      }),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="border-gold/30 bg-gold/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-navy">Request Received!</h3>
          <p className="mt-2 text-muted-foreground">Our team will prepare your valuation report within 48 hours.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" required /></div>
      <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
      <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" required /></div>
      <div><Label htmlFor="address">Property Address</Label><Textarea id="address" name="address" rows={2} required placeholder="123 Main St, Brooklyn, NY 11201" /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label htmlFor="beds">Bedrooms</Label><Input id="beds" name="beds" type="number" /></div>
        <div><Label htmlFor="baths">Bathrooms</Label><Input id="baths" name="baths" type="number" /></div>
      </div>
      <Button type="submit" variant="gold" size="lg" className="w-full">Get My Free Valuation</Button>
    </form>
  );
}
