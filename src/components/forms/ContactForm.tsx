"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { UIText } from "@/lib/types/UIText"

interface ContactFormProps {
  onSubmit?: (data: FormData) => void
  uiText: UIText
}

interface FormData {
  name: string
  email: string
  category: string
  phone: string
  message: string
}

export function ContactForm({ onSubmit, uiText }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Validate form data
    if (!formData.name.trim()) {
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.message.trim()) {
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("[v0] Form submitted:", formData)
      }
      setSubmitStatus("success")
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        category: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="space-y-2">
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleInputChange}
          placeholder={uiText.contactForm.placeholders.name}
          className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base font-light placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors"
          aria-required="true"
          aria-invalid={formData.name === "" ? "true" : "false"}
          aria-label={uiText.contactForm.ariaLabels.name}
        />
      </div>

      <div className="space-y-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder={uiText.contactForm.placeholders.email}
          className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base font-light placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors"
          aria-required="true"
          aria-invalid={formData.email === "" ? "true" : "false"}
          aria-label={uiText.contactForm.ariaLabels.email}
        />
      </div>

      <div className="space-y-2">
        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleInputChange}
          placeholder={uiText.contactForm.placeholders.category}
          className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base font-light placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors"
          aria-label={uiText.contactForm.ariaLabels.category}
        />
      </div>

      <div className="space-y-2">
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder={uiText.contactForm.placeholders.phone}
          className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base font-light placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors"
          aria-label={uiText.contactForm.ariaLabels.phone}
        />
      </div>

      <div className="space-y-2">
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          placeholder={uiText.contactForm.placeholders.message}
          rows={4}
          className="w-full bg-transparent border-0 border-b border-border px-0 py-3 text-base font-light placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-0 resize-none transition-colors"
          aria-required="true"
          aria-invalid={formData.message === "" ? "true" : "false"}
          aria-label={uiText.contactForm.ariaLabels.message}
        />
      </div>

      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 text-green-800 rounded text-sm" role="alert" aria-live="polite">
          {uiText.contactForm.messages.success}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 text-red-800 rounded text-sm" role="alert" aria-live="assertive">
          {uiText.contactForm.messages.error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={isSubmitting}
        aria-label={isSubmitting ? uiText.common.submitting : uiText.common.submit}
      >
        {isSubmitting ? uiText.common.submitting : uiText.common.submit}
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </Button>
    </form>
  )
}
