import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './CreateChatroomModal.module.css';
import useAppStore from '../../store/appStore';
import toast from 'react-hot-toast';
import Input from '../common/Input';
import Button from '../common/Button';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(50),
});

const CreateChatroomModal = ({ isOpen, onClose }) => {
  const createChatroom = useAppStore((state) => state.createChatroom);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    createChatroom(data.title);
    toast.success(`Chatroom "${data.title}" created!`);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Create New Chat</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Chat Title"
            {...register('title')}
            error={errors.title}
            placeholder="e.g., Project Ideas"
          />
          <div className={styles.buttons}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChatroomModal;