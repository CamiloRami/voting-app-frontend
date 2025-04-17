'use client';
import { useState } from 'react';
import styles from '@/app/ui/AdminLoginForm/AdminLoginForm.module.css';
import { createVoter } from '@/services/voter';
import { toast } from 'react-toastify';

export default function NewVoter() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const voterData = {
        document: formData.get('document'),
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        dateOfBirth: formData.get('dateOfBirth'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        sex: formData.get('sex'),
        isCandidate: formData.get('isCandidate') === 'true' ? 1 : 0,
      };

      await createVoter(voterData);
      toast.success('Voter created successfully!');
      event.target.reset();
    } catch (error) {
      toast.error('Error creating voter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Register New Voter</h1>
        
        <label className={styles.label}>
          Document:
          <input
            type="text"
            name="document"
            required
            className={styles.input}
            disabled={isLoading}
            placeholder="Enter document or ID"
          />
        </label>

        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            required
            className={styles.input}
            disabled={isLoading}
            placeholder="Enter first name"
          />
        </label>

        <label className={styles.label}>
          Last Name:
          <input
            type="text"
            name="lastName"
            required
            className={styles.input}
            disabled={isLoading}
            placeholder="Enter last name"
          />
        </label>

        <label className={styles.label}>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            required
            className={styles.input}
            disabled={isLoading}
          />
        </label>

        <label className={styles.label}>
          Address:
          <input
            type="text"
            name="address"
            required
            className={styles.input}
            disabled={isLoading}
            placeholder="Enter address"
          />
        </label>

        <label className={styles.label}>
          Phone:
          <input
            type="tel"
            name="phone"
            required
            className={styles.input}
            disabled={isLoading}
            placeholder="Enter phone number"
          />
        </label>

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
    </div>
  );
}