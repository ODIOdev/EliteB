"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadFormProps {
  propertyInterest?: string;
  title?: string;
}

export function LeadForm({ propertyInterest = "General inquiry", title = "Contact Agent" }: LeadFormProps) {
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
        interest: propertyInterest,
        message: form.get("message"),
      }),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="border-gold/30 bg-gold/5">
        <CardContent className="p-6 text-center">
          <p className="font-semibold text-navy">Thank you!</p>
          <p className="text-sm text-muted-foreground">An agent will contact you within 24 hours.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">{title}</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
          <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
          <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" /></div>
          <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={3} placeholder="I'm interested in scheduling a tour..." /></div>
          <Button type="submit" variant="gold" className="w-full">Send Inquiry</Button>
        </form>
      </CardContent>
    </Card>
  );
}
