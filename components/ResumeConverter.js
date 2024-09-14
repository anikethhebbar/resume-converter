import React, { useState } from 'react';
import { Button, Input, Box, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, VStack, HStack } from '@chakra-ui/react';

const ResumeConverter = ({ apiKey, llm }) => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConversion = async () => {
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('llm', llm);
    formData.append('apiKey', apiKey);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const result = await response.json();
      setHtmlContent(result.html);
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4} align="stretch">
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <Button onClick={handleConversion} isDisabled={isLoading}>
          {isLoading ? <Spinner size="sm" mr={2} /> : null}
          {isLoading ? 'Converting...' : 'Convert Resume'}
        </Button>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {htmlContent && (
          <VStack spacing={4} align="stretch">
            <HStack>
              <Button onClick={handleDownload} colorScheme="blue">
                Download HTML
              </Button>
              <Button onClick={togglePreview} colorScheme="green">
                {showPreview ? 'Hide Preview' : 'View HTML'}
              </Button>
            </HStack>
            {showPreview && (
              <Box 
                borderWidth={1} 
                borderRadius="md" 
                p={4}
                maxHeight="500px"
                overflowY="auto"
              >
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </Box>
            )}
            <Box>
              <Box fontWeight="bold" mb={2}>HTML Code:</Box>
              <Box
                as="pre"
                bg="gray.100"
                p={4}
                borderRadius="md"
                whiteSpace="pre-wrap"
                overflowX="auto"
                maxHeight="300px"
                overflowY="auto"
              >
                {htmlContent}
              </Box>
            </Box>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default ResumeConverter;