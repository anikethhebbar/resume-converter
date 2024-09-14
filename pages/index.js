import React, { useState } from 'react';
import Layout from '/components/Layout';
import APIKeyForm from '/components/APIKeyForm';
import ResumeConverter from '/components/ResumeConverter';

export default function Home() {
  const [config, setConfig] = useState(null);

  return (
    <Layout>
      {!config ? (
        <APIKeyForm onSubmit={setConfig} />
      ) : (
        <ResumeConverter apiKey={config.apiKey} llm={config.llm} />
      )}
    </Layout>
  );
}