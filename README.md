# AeroAssist ✈️

### AI-Powered Airline Customer Resolution Agent

AeroAssist is an AI-powered airline customer support and resolution platform designed to handle common flight disruption scenarios such as cancellations, delays, compensation eligibility, rebooking requests, and escalation to human support.

The system combines a modern Next.js customer-support interface with a Python FastAPI backend and Google's Gemini AI to provide policy-aware, booking-specific assistance.

---

## 🌐 Live Demo

**Website:**  
https://aeroassist-kappa.vercel.app/

The application frontend is deployed on **Vercel**, while the AI agent backend is deployed on **Render**.

---

## 📌 Project Overview

Airline customer-support teams frequently deal with repetitive disruption-related requests such as:

- Flight cancellations
- Flight delays
- Refund requests
- Rebooking requests
- Compensation eligibility
- Lounge access
- Hotel accommodation
- Fare differences
- Requests requiring human escalation

AeroAssist demonstrates how an AI agent can assist with these requests while using verified booking information and predefined airline resolution policies.

The frontend provides the customer-facing workspace, while the backend acts as the authoritative source for booking information and resolution logic.

---

## ✨ Key Features

### 🤖 AI Customer Resolution Agent

AeroAssist uses Google's Gemini model to understand customer messages and provide conversational assistance.

The agent can:

- Understand natural-language requests
- Ask customers for missing information
- Analyze flight disruption scenarios
- Explain applicable resolutions
- Trigger supported system actions
- Escalate requests outside the standard policy

---

### 🔐 Verified Booking Context

Customer and flight information is maintained on the backend.

The system uses a booking reference / PNR to identify the corresponding booking and provide verified information to the AI agent.

The frontend's demo customer panel is provided only as a testing reference and does not automatically inject customer information into the conversation.

---

### 🧾 Cancellation Resolution

For cancelled flights, the system can handle the airline's defined resolution policy, including:

- Free rebooking within the applicable time window
- Full refund through the original payment method
- Priority rebooking for eligible loyalty tiers

Requests outside the defined policy can be escalated.

---

### ⏱️ Delay Resolution

The system supports different resolutions based on delay duration.

| Delay | Resolution |
|---|---|
| Under 3 hours | ₹500 meal voucher |
| 3+ hours | Meal voucher + lounge access |
| 5+ hours | Meal voucher + lounge access + hotel accommodation |

The hotel policy applies to the delayed hours rather than automatically providing a full night's stay.

---

### 👤 Human Escalation

Certain requests are automatically routed toward human-agent assistance.

Examples include:

- Legal threats
- Formal complaints
- Compensation outside policy
- Fare-difference waivers above the permitted threshold
- Requests for unsupported benefits

---

### 💬 Natural Conversation

The chat interface is intentionally designed without preset demo conversations.

A user can begin with:

> Hi

The agent can then request the information required to identify and resolve the customer's issue.

---

### 📱 Responsive Interface

The frontend is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

The interface uses a modern airline-inspired visual system with responsive layouts, status indicators, customer information panels, and a conversational support workspace.

---

## 🏗️ Technology Stack

### Frontend

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**

### Backend

- **Python**
- **FastAPI**
- **Pydantic**
- **Uvicorn**
- **python-dotenv**

### AI

- **Google Gemini**
- **google-genai SDK**
- **Gemini 3.5 Flash Lite**

### Deployment

- **Vercel** — Frontend
- **Render** — Backend

---

## 🧩 High-Level Architecture

```text
┌─────────────────────────────────────────────┐
│                  USER                       │
│                                             │
│        Desktop / Tablet / Mobile            │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              NEXT.JS FRONTEND               │
│                                             │
│  • AeroAssist UI                            │
│  • Chat Interface                           │
│  • Demo Customer Reference                  │
│  • Responsive Layout                        │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────┐
│             NEXT.JS API PROXY               │
│                                             │
│             /api/chat                       │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTP
                       ▼
┌─────────────────────────────────────────────┐
│          PYTHON FASTAPI BACKEND             │
│                                             │
│  • Booking Verification                     │
│  • Customer Context                         │
│  • Resolution Policy                        │
│  • AI Agent                                 │
│  • System Actions                           │
│  • Escalation                               │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              GOOGLE GEMINI                  │
│                                             │
│       Gemini 3.5 Flash Lite                 │
│                                             │
│  Natural Language Understanding             │
│  Policy-Aware Resolution                    │
│  Tool / Function Calling                    │
└─────────────────────────────────────────────┘