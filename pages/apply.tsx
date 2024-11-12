import React, { useState } from "react";
import Image from "next/image";
import ApplicationForm from "../components/ApplicationForm";
import { Icon } from "../components/Icons";

// Application page that displays job details and handles application submission
export default function ApplyPage() {
  // State for displaying submission status messages
  const [message, setMessage] = useState("");

  // Handler for form submission
  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit application");
      }

      setMessage("Application submitted successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to submit application. Please try again.");
      return Promise.reject(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <div style={styles.titleContainer}>
        <Image src="/walmart.png" alt="Walmart Logo" style={styles.logo} />
        <div>
          <h2 style={styles.companyName}>Walmart</h2>
          <h1 style={styles.jobTitle}>Sanitation and Hygiene Engineer</h1>
        </div>
      </div>
      <div style={styles.detailsContainer}>
        <div style={styles.detailItem}>
          <Icon name="briefcase" />
          <span>Full-time</span>
        </div>
        <div style={styles.detailItem}>
          <Icon name="location" />
          <span>Bentonville, AR</span>
        </div>
        <div style={styles.detailItem}>
          <Icon name="money" />
          <span>$15-18/hr</span>
        </div>
        <div style={styles.detailItem}>
          <Icon name="clock" />
          <span>Immediate Start</span>
        </div>
      </div>
      <div style={styles.jobDescription}>
        <h2 style={styles.sectionTitle}>Position Summary</h2>
        <p style={styles.paragraph}>
          We are seeking a dedicated and detail-oriented Sanitation and Hygiene
          Engineer to join our team. In this essential role, you will be
          responsible for ensuring a clean, safe, and welcoming environment for
          all. You will work closely with other departments to maintain the
          highest standards of cleanliness, hygiene, and facility maintenance,
          making a real impact on our space and the people in it.
        </p>

        <h2 style={styles.sectionTitle}>Key Responsibilities</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            Oversee daily sanitation and hygiene operations, ensuring that all
            areas meet or exceed established cleanliness standards.
          </li>
          <li style={styles.listItem}>
            Execute routine cleaning procedures, including sweeping, mopping,
            dusting, and sanitizing high-touch surfaces.
          </li>
          <li style={styles.listItem}>
            Perform specialized cleaning projects, such as deep-cleaning
            carpets, polishing floors, and handling hazardous material disposal
            when necessary.
          </li>
          <li style={styles.listItem}>
            Conduct regular inspections of facilities to identify and address
            areas that require attention or repair.
          </li>
          <li style={styles.listItem}>
            Maintain cleaning equipment and materials, ensuring they are in safe
            working condition and reporting any issues as they arise.
          </li>
          <li style={styles.listItem}>
            Coordinate with the Facilities Management team to develop and
            implement best practices for health and safety compliance.
          </li>
          <li style={styles.listItem}>
            Participate in sustainability initiatives by utilizing eco-friendly
            cleaning supplies and promoting waste reduction practices.
          </li>
          <li style={styles.listItem}>
            Respond promptly to urgent maintenance requests and emergencies,
            addressing spills, leaks, or other facility issues with efficiency
            and care.
          </li>
          <li style={styles.listItem}>
            Contribute to a positive work environment by fostering a culture of
            teamwork, respect, and continuous improvement.
          </li>
        </ul>

        <h2 style={styles.sectionTitle}>Qualifications</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            Proven experience in custodial, janitorial, or facility maintenance
            roles is preferred.
          </li>
          <li style={styles.listItem}>
            Strong attention to detail with a commitment to high standards of
            cleanliness.
          </li>
          <li style={styles.listItem}>
            Ability to work independently and take initiative when identifying
            and addressing sanitation needs.
          </li>
          <li style={styles.listItem}>
            Physical stamina to handle routine manual tasks, including lifting,
            bending, and prolonged periods of standing.
          </li>
          <li style={styles.listItem}>
            Basic knowledge of cleaning products and safety protocols, with a
            commitment to learning eco-friendly practices.
          </li>
          <li style={styles.listItem}>
            Positive attitude and excellent communication skills; ability to
            collaborate effectively with team members and other departments.
          </li>
        </ul>

        <h2 style={styles.sectionTitle}>Why Join Us?</h2>
        <p style={styles.paragraph}>
          As a Sanitation and Hygiene Engineer, you play an integral role in
          creating a welcoming and healthy environment for everyone who enters
          our space. We value your skills and dedication, and we're committed to
          supporting your growth with ongoing training, a supportive team
          culture, and opportunities to make a real difference in our
          organization.
        </p>
        <p style={styles.paragraph}>
          Apply today to help us keep our space safe, sparkling, and ready for
          whatever comes next!
        </p>
      </div>
      <ApplicationForm onSubmit={handleFormSubmit} />
      {message && (
        <div
          style={{
            ...styles.message,
            ...styles.successMessage,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <Icon name="success" />
            {message}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    height: "60px",
    marginBottom: "1rem",
  },
  logo: {
    width: "60px",
    height: "60px",
  },
  companyName: {
    fontSize: "1.2rem",
    color: "#666",
    margin: 0,
  },
  jobTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    margin: 0,
  },
  detailsContainer: {
    display: "flex",
    gap: "2rem",
    marginTop: "0.5rem",
    marginBottom: "1rem",
    color: "#666",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  jobDescription: {
    marginTop: "2rem",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginTop: "1.5rem",
    marginBottom: "0.75rem",
  },
  paragraph: {
    marginBottom: "1rem",
  },
  list: {
    marginLeft: "1.5rem",
    marginBottom: "1rem",
    listStyleType: "disc",
  },
  listItem: {
    marginBottom: "0.5rem",
  },
  message: {
    padding: "1rem",
    marginTop: "1rem",
    borderRadius: "4px",
    textAlign: "center" as const,
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  successMessage: {
    backgroundColor: "#e6f4ea",
    color: "#1e4620",
    border: "1px solid #b7dfb9",
  },
};
