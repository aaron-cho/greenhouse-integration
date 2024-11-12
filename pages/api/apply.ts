import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

// Disable Next.js body parsing since we're handling multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the multipart form data using formidable
    const form = formidable();
    const [fields, files] = await new Promise<
      [formidable.Fields, formidable.Files]
    >((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files] as const);
      });
    });

    // Extract form fields and resume file
    const firstName = fields.firstName?.[0];
    const lastName = fields.lastName?.[0];
    const email = fields.email?.[0];
    const resumeFile = files.resume?.[0];

    // Validate required fields
    if (!firstName || !lastName || !email || !resumeFile) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          firstName: firstName ? "present" : "missing",
          lastName: lastName ? "present" : "missing",
          email: email ? "present" : "missing",
          resume: resumeFile ? "present" : "missing",
        },
      });
    }

    // Step 1: Create candidate in Greenhouse with initial application data
    const candidateResponse = await axios.post(
      "https://harvest.greenhouse.io/v1/candidates",
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        applications: [
          {
            job_id: process.env.GREENHOUSE_JOB_ID,
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.GREENHOUSE_API_KEY + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
          "On-Behalf-Of": process.env.GREENHOUSE_USER_ID,
        },
      }
    );

    const candidateId = candidateResponse.data.id;

    // Step 2: Upload resume as an attachment to the candidate's profile
    const resumeContent = fs.readFileSync(resumeFile.filepath);
    const base64Resume = resumeContent.toString("base64");

    await axios.post(
      `https://harvest.greenhouse.io/v1/candidates/${candidateId}/attachments`,
      {
        filename: resumeFile.originalFilename,
        type: "resume",
        content: base64Resume,
        content_type: resumeFile.mimetype,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.GREENHOUSE_API_KEY + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
          "On-Behalf-Of": process.env.GREENHOUSE_USER_ID,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Greenhouse Error:", error.response?.data || error);
    res.status(500).json({ error: "Error submitting application" });
  }
}
