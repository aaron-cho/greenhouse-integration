import { useState } from "react";

const ApplicationForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // Reset all form fields to their initial state
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setCoverLetter("");
    setResume(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate resume is attached
    if (!resume) {
      console.error("Resume is required");
      return;
    }

    // Create FormData object and append all form fields
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("linkedin", linkedin);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);

    try {
      // Submit form data to parent component
      await onSubmit(formData);
      clearForm(); // Reset form on successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle resume file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Apply for this job</h2>

      <label style={styles.label}>
        First Name<span style={styles.asterisk}>*</span>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Last Name<span style={styles.asterisk}>*</span>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Email<span style={styles.asterisk}>*</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Resume <span style={styles.asterisk}>*</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Phone
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        LinkedIn Profile URL
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Tell us why you're interested in this position
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={4}
          style={{ ...styles.input, height: "100px", resize: "vertical" }}
        />
      </label>

      <button type="submit" style={styles.button}>
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    marginBottom: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  asterisk: {
    color: "red",
    marginLeft: "4px",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.3rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    marginTop: "1.5rem",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
