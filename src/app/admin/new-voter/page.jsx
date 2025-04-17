'use client';
import { useState } from 'react';
import styles from '../admin-pages.module.css';
import VoterForm from '@/app/ui/VoterForm';
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
      <VoterForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}