import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, Select, Box } from '@chakra-ui/react';

const APIKeyForm = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [llm, setLLM] = useState('');

  const handleSubmit = () => {
    if (apiKey && llm) {
      onSubmit({ apiKey, llm });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <FormControl mb={4}>
        <FormLabel htmlFor="api-key">API Key</FormLabel>
        <Input
          id="api-key"
          type="password"
          placeholder="Enter your API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="llm">Select LLM</FormLabel>
        <Select
          id="llm"
          placeholder="Select LLM"
          value={llm}
          onChange={(e) => setLLM(e.target.value)}
        >
          <option value="openai">OpenAI GPT-3.5</option>
          <option value="anthropic">Anthropic Claude</option>
          <option value="gemini">Google Gemini</option>
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} width="full" isDisabled={!apiKey || !llm}>
        Submit
      </Button>
    </Box>
  );
};

export default APIKeyForm;
