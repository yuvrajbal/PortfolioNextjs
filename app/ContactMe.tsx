"use client";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormProps {
  email: string;
  body: string;
  setEmail: (email: string) => void;
  setBody: (body: string) => void;
  sendEmail: () => Promise<void>;
  sent: boolean;
  emailError: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function ContactForm({
  email,
  body,
  setEmail,
  setBody,
  sendEmail,
  sent,
  emailError,
}: ContactFormProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 border dark:border-none rounded-lg shadow-2xl mb-2 ">
      <div className="bg-gray-100 text-black dark:text-white dark:bg-zinc-700 p-4 rounded-t-lg">
        <h1 className="text-base font-bold pb-1">
          Have a question? Drop in your message
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 pb-2">
          It won&apos;t take more than 10 seconds. Shoot your shot.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4 text-black dark:text-white">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm ">
            Email Address
          </label>
          <input
            id="email"
            className={`border ${
              emailError
                ? "border-red-500"
                : "border-gray-500 dark:border-gray-700"
            } rounded-md p-1 focus:outline-none dark:bg-inherit`}
            type="email"
            value={email}
            placeholder="johndoe@xyz.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            id="message"
            className="border border-gray-500 dark:border-gray-700 rounded-lg p-1 dark:bg-inherit focus:outline-none"
            rows={3}
            value={body}
            placeholder="I'd love a compliment from you"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button
          className="font-bold text-zinc-950 dark:text-white border border-zinc-950 py-3 rounded-lg my-2 dark:border-gray-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={sendEmail}
          disabled={!sent || !email || !body || Boolean(emailError)}
        >
          {sent ? "Submit" : "Submitting..."}
        </button>
      </div>
    </div>
  );
}

export default function ContactMe() {
  const [chatOpen, setChatOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value) {
      setEmailError("");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const sendEmail = async () => {
    if (!email || !body) return;
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setSent(false);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, body }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setEmail("");
      setBody("");
      setChatOpen(false); // Close the form on success
      toast.success("Message sent successfully!", {
        description: "I'll get back to you soon!",
      });
    } catch (err) {
      console.error("Error while sending message:", err);
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setSent(true);
    }
  };

  return (
    <div className="fixed right-4 md:right-10 bottom-10 flex flex-col items-end z-50">
      {chatOpen && (
        <ContactForm
          email={email}
          body={body}
          setEmail={handleEmailChange}
          setBody={setBody}
          sendEmail={sendEmail}
          sent={sent}
          emailError={emailError}
        />
      )}

      <button
        className="bg-gray-100 dark:bg-zinc-800 w-14 h-14 rounded-full flex items-center justify-center hover:shadow-xl transition duration-200 shadow-lg"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>
    </div>
  );
}
