"use client"
import { editEntry, getSpecificEntry } from '../../../actions';
import { useEffect, useState } from 'react';
import UpdateEntry from '../../../components/UpdateEntry/UpdateEntry';

const EditEntry: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return (
    <>
      <UpdateEntry params={{id}}/>
    </>
  );
};

export default EditEntry;
