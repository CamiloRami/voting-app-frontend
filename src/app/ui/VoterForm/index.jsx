import styles from './VoterForm.module.css'

const FormField = ({ label, ...props }) => (
  <label className={styles.label}>
    {label}:
    <input className={styles.input} {...props} />
  </label>
)

export default function VoterForm ({ onSubmit, isLoading }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Register New Voter</h1>

      <FormField
        label="Document"
        name="document"
        type="text"
        required
        disabled={isLoading}
        placeholder="Enter document or ID"
      />

      <FormField
        label="Name"
        name="name"
        type="text"
        required
        disabled={isLoading}
        placeholder="Enter first name"
      />

      <FormField
        label="Last Name"
        name="lastName"
        type="text"
        required
        disabled={isLoading}
        placeholder="Enter last name"
      />

      <FormField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        required
        disabled={isLoading}
      />

      <FormField
        label="Address"
        name="address"
        type="text"
        required
        disabled={isLoading}
        placeholder="Enter address"
      />

      <FormField
        label="Phone"
        name="phone"
        type="tel"
        required
        disabled={isLoading}
        placeholder="Enter phone number"
      />

      <label className={styles.label}>
        Sex:
        <select
          name="sex"
          required
          className={styles.input}
          disabled={isLoading}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </label>

      <label className={styles.label}>
        Is Candidate:
        <select
          name="isCandidate"
          required
          className={styles.input}
          disabled={isLoading}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </label>

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Voter'}
      </button>
    </form>
  )
}
