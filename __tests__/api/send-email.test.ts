import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/send-email/route";

// ── mock sendContactEmail so tests don't hit real SMTP ────────────────────────

const { mockSendContactEmail } = vi.hoisted(() => ({
  mockSendContactEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/email", () => ({
  sendContactEmail: mockSendContactEmail,
}));

// ── helpers ───────────────────────────────────────────────────────────────────

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Alice",
  email: "alice@example.com",
  subject: "Hello",
  message: "Test message",
  website: "",
};

// ── tests ─────────────────────────────────────────────────────────────────────

describe("POST /api/send-email", () => {
  beforeEach(() => {
    mockSendContactEmail.mockClear();
  });

  describe("honeypot", () => {
    it("returns 200 silently when the honeypot field is filled", async () => {
      const res = await POST(makeRequest({ ...validBody, website: "http://spam.com" }));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.message).toBe("Email sent successfully!");
    });

    it("does NOT call sendContactEmail when the honeypot is filled", async () => {
      await POST(makeRequest({ ...validBody, website: "filled" }));
      expect(mockSendContactEmail).not.toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("returns 400 when name is missing", async () => {
      const res = await POST(makeRequest({ ...validBody, name: "" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when email is invalid", async () => {
      const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when subject is missing", async () => {
      const res = await POST(makeRequest({ ...validBody, subject: "" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when message is missing", async () => {
      const res = await POST(makeRequest({ ...validBody, message: "" }));
      expect(res.status).toBe(400);
    });
  });

  describe("successful submission", () => {
    it("returns 200 with success message for a valid submission", async () => {
      const res = await POST(makeRequest(validBody));
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.message).toBe("Email sent successfully!");
    });

    it("calls sendContactEmail with the submitted form data", async () => {
      await POST(makeRequest(validBody));
      expect(mockSendContactEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Alice",
          email: "alice@example.com",
          subject: "Hello",
          message: "Test message",
        })
      );
    });
  });

  describe("error handling", () => {
    it("returns 500 when sendContactEmail throws", async () => {
      mockSendContactEmail.mockRejectedValueOnce(new Error("SMTP failure"));
      const res = await POST(makeRequest(validBody));
      expect(res.status).toBe(500);
    });
  });
});
